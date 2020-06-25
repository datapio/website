---
title: Managed Services
abstract: |
  Read about our integrations of Kubernetes Operators allowing
  the automatic provisionning of databases, Vaults, and multiple
  other services.
seeAlso:
  - /docs/cloud/catalog
toc: yes
wip: yes
---

# Overview

Managed services such as a database, secret storages, or load balancers can be complex to manage on your own.
**Datapio** provides the deployment of various Kubernetes operators in order to handle the complexity.

The **Catalog Operator** allows you to enable in your cluster such managed services through `ClusterFeature` resources.
The creation of those resources will trigger the deployment of the corresponding operators to a dedicated namespace.
