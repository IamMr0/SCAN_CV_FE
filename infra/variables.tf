variable "region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-1"
}

variable "bucket_name" {
  description = "S3 bucket name for the frontend assets"
  type        = string
  default     = "xbrain-12-static-web-scan-cv"
}

variable "tags" {
  description = "Common resource tags"
  type        = map(string)
  default     = {}
}
