output "bucket_id" {
  value = module.s3.bucket_id
}

output "bucket_arn" {
  value = module.s3.bucket_arn
}

output "bucket_name" {
  value = module.s3.bucket_name
}

output "cloudfront_domain_name" {
  value = module.cf.cloudfront_domain_name
}
