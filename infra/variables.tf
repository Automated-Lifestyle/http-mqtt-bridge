variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "ap-southeast-1"
}

variable "profile" {
  description = "AWS credentials profile"

  type    = string
  default = "al-mqtt"
}

variable "nodejs_runtime" {
  description = "Nodejs runtime for Lambdas"

  type    = string
  default = "ap-southeast-1"
}
