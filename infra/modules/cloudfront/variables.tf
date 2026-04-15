variable "s3_bucket_regional_domain_name" {
  description = "S3 bucket regional domain name for CloudFront origin configuration"
  type        = string
}

variable "s3_origin" {
  description = "S3 bucket origin for CloudFront distribution"
  type        = string
}

variable "s3_bucket_name" {
  description = "S3 bucket name"
  type        = string
}

variable "s3_bucket_arn" {
  description = "S3 bucket ARN for bucket policy"
  type        = string

}
