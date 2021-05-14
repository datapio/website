---
layout: catalog-section
title: Catalog
abstract: |
  Provision your cluster with Ansible roles and Helm charts,
  with a full integration to our marketplace.
tags:
  - cloud
  - catalog
wip: yes
---

The **Catalog Operator** is the central piece of our [Marketplace](#). It provides the ability
to deploy bundles of pre-configured applications, extending your cluster features.

While the *Marketplace* will create resources in the cluster to describe the wanted features,
the operator will take care of the deployment.

Based on the [Ansible Operator SDK](https://sdk.operatorframework.io/docs/ansible/) and the
[Helm Operator](https://github.com/fluxcd/helm-operator), the *Catalog* can integrate seamlessly
any technology.
