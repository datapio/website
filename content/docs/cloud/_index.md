---
weight: 4
title: Cloud Infrastructure
abstract: |
  Get your managed Kubernetes cluster, pre-provisionned with
  **Datapio**, or use the SaaS solution. Read more about our
  cloud products.
wip: yes
---

**Datapio Cloud** makes the deployment of **Datapio** as easy as a click.

It leverages the capabilities of [OneInfra](https://oneinfra.net) to provide
a managed Kubernetes control plane, and the API of various cloud providers to
provision the worker nodes.

Datacenter Federation is achieved with [Consul](https://learn.hashicorp.com/consul/security-networking/datacenters)
transparently in order to provide a complete integration of all your clusters.

{{< figure "/media/docs/cloud-architecture.png" >}}
