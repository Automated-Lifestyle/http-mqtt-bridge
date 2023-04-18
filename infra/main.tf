provider "aws" {
  region  = var.aws_region
  profile = var.profile

  # Make it faster by skipping something
  #   skip_metadata_api_check     = true
  skip_region_validation = true
  #   skip_credentials_validation = true
  #   skip_requesting_account_id  = true
}

resource "aws_iam_role" "lambda_role" {
  name = "al_lambda_function_role"
  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : "sts:AssumeRole",
        "Principal" : {
          "Service" : "lambda.amazonaws.com"
        },
        "Effect" : "Allow",
        "Sid" : ""
      }
    ]
  })
}

resource "aws_iam_policy" "iam_policy_for_lambda" {
  name        = "aws_iam_policy_for_terraform_aws_lambda_role"
  path        = "/"
  description = "AWS IAM Policy for managing aws lambda role"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Action" : [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        "Resource" : "arn:aws:logs:*:*:*",
        "Effect" : "Allow"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_iam_policy_to_iam_role" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.iam_policy_for_lambda.arn
}

locals {
  build_directory_path              = "${path.module}/../build"
  lambda_common_libs_layer_path     = "${path.module}/../files/layers/common-libs"
  lambda_common_libs_layer_zip_name = "${local.build_directory_path}/common-libs.zip"
}

resource "null_resource" "test_lambda_nodejs_layer" {
  provisioner "local-exec" {
    working_dir = "${local.lambda_common_libs_layer_path}/nodejs"
    command     = "npm install"
  }

  triggers = {
    rerun_every_time = "${uuid()}"
  }
}

data "archive_file" "test_lambda_common_libs_layer_package" {
  type        = "zip"
  source_dir  = local.lambda_common_libs_layer_path
  output_path = local.lambda_common_libs_layer_zip_name

  depends_on = ["null_resource.test_lambda_nodejs_layer"]
}

resource "aws_lambda_layer_version" "test_lambda_nodejs_layer" {
  layer_name          = "common-libs"
  filename            = local.lambda_common_libs_layer_zip_name
  source_code_hash    = data.archive_file.test_lambda_common_libs_layer_package.output_base64sha256
  compatible_runtimes = [var.nodejs_runtime]
}


resource "aws_lambda_function" "uhoo-lambda" {
  function_name = "uhoo-lambda"

  runtime = var.nodejs_runtime
  handler = "uhoo-data-lambda.handler"

  source_code_hash = data.archive_file.lambda_sg_demo.output_base64sha256

  role = aws_iam_role.lambda_exec.arn
}

