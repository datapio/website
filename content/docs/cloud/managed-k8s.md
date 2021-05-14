---
title: Managed Kubernetes
abstract: |
  Learn more about how to setup and provision
  your dedicated cluster.
tags:
  - cloud
  - kubernetes
  - managed
toc: yes
wip: true
---

# Overview

The creation of a resource `Cluster` will trigger the deployment and provisionning of:

 - the Kubernetes cluster's control plane, using [OneInfra](https://oneinfra.net)
 - the worker nodes using common Cloud APIs

{{< figure "/media/docs/managed-k8s-architecture.png" >}}

# Example

```yaml
---
apiVersion: datap.io/v1alpha1
kind: Cluster
metadata:
  name: my-cluster
  namespace: default
spec:
  controlPlane:
    replicas: 3
  workers:
    - cpu: 3GHz
      memory: 16GB
    - cpu: 3GHz
      memory: 16GB
    - cpu: 3GHz
      memory: 16GB
```

**NB: This example is only a draft.**
