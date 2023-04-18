provider "aws" {
  region  = var.aws_region
  profile = var.profile

  # Make it faster by skipping something
  #   skip_metadata_api_check     = true
  skip_region_validation = true
  #   skip_credentials_validation = true
  #   skip_requesting_account_id  = true
}

module "lambda_function" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "uhoo-data-lambda"
  description   = "Uhoo Data Lambda"
  handler       = "index.handler"
  runtime       = "nodejs16.x"
  publish       = true

  source_path = "."

  store_on_s3 = true
  s3_bucket   = module.s3_bucket.s3_bucket_id

  tags = {
    Module = "uhoo-data-lambda"
  }
}

module "s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "~> 3.0"

  bucket_prefix = "al-"
  force_destroy = true

  # S3 bucket-level Public Access Block configuration
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true

  versioning = {
    enabled = true
  }
}
