provider "aws" {
  region = var.aws_region
}

provider "azurerm" {
  features {}
}

provider "google" {
  project = var.gcp_project
  region  = var.gcp_region
}

# Resource Group for Azure
resource "azurerm_resource_group" "rg" {
  name     = "cloudgov-rg"
  location = "East US"
}

# S3 Bucket for AWS Cost Reports
resource "aws_s3_bucket" "cost_reports" {
  bucket = "cloudgov-cost-reports-${var.environment}"
}

# GCS Bucket for GCP Audit Logs
resource "google_storage_bucket" "audit_logs" {
  name          = "cloudgov-audit-logs-${var.environment}"
  location      = "US"
  force_destroy = true
}

# Placeholder for K8s Cluster (EKS/AKS/GKE)
# module "eks" { ... }
