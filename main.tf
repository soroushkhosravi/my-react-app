terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.4"
    }
  }
  # We define a backend for the terraform state file. This saves all the changes related to the AWS elements.
  backend "s3" {
    bucket = "my-react-app-practice"
    key    = "statefile"
    region = "us-west-2"
  }
  required_version = ">= 1.0.0"
}

provider "aws" {
  region = "us-west-2"
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.example.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.example.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.cluster-auth.token
}

data "aws_eks_cluster" "example" {
  name = "my-cluster"
}

data "aws_eks_cluster_auth" "cluster-auth" {
  name = data.aws_eks_cluster.example.name
}

data "aws_cloudformation_stack" "my-eks-vpc-stack" {
  name = "my-eks-vpc-stack"
}

provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.example.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.example.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.cluster-auth.token
  }
}

data "external" "env" {
  program = ["sh", "${path.module}/env.sh"]
}

resource "helm_release" "my-react-app-release" {
  name         = "my-react-app-release"
  namespace    = "my-react-app"
  repository   = "https://soroushkhosravi.github.io/helm-charts"
  version      = "0.5.0"
  chart        = "frontend"
  reset_values = true
  set {
    name  = "appName"
    value = "MyReactApp"
  }

  set {
    name  = "namespaceName"
    value = "my-react-app"
  }

  set {
    name  = "loadBalancerName"
    value = "react-app-load-balancer"
  }

  set {
    name  = "current-time"
    value = timestamp()
  }

  set {
    name  = "commit"
    value = data.external.env.result["CIRCLE_SHA1"]
  }
}

data "kubernetes_ingress_v1" "example" {
  metadata {
    name      = "my-react-app-ingress"
    namespace = "my-react-app"
  }
  depends_on = [helm_release.my-react-app-release]
}

data "aws_route53_zone" "selected" {
  name         = "housingselection.co.uk."
  private_zone = false
}


locals {
  lb_name_parts = split("-", split(".", data.kubernetes_ingress_v1.example.status.0.load_balancer.0.ingress.0.hostname).0)
}

data "aws_lb" "foobar" {
  name = join("-", slice(local.lb_name_parts, 0, length(local.lb_name_parts) - 1))
}


resource "aws_route53_record" "abc" {
  zone_id = data.aws_route53_zone.selected.id
  name    = "test"
  type    = "A"

  alias {
    name                   = data.aws_lb.foobar.dns_name
    zone_id                = data.aws_lb.foobar.zone_id
    evaluate_target_health = true
  }
}