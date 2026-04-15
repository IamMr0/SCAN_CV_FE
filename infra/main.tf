terraform {

  cloud {

    organization = "minghoan"

    workspaces {
      name = "XBrain-capstone-1-Scan-cv-fe"
    }
  }
}


terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.33.0"
    }
  }
}

provider "aws" {
  region = var.region
}

module "s3" {
  source      = "./modules/s3"
  bucket_name = var.bucket_name
  tags        = var.tags
}

module "cf" {
  source                         = "./modules/cloudfront"
  s3_bucket_regional_domain_name = module.s3.bucket_regional_domain_name
  s3_origin                      = module.s3.bucket_id
  s3_bucket_name                 = var.bucket_name
  s3_bucket_arn                  = module.s3.bucket_arn
}
