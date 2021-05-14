---
title: Ingress System
abstract: |
  Provides Ingress management capabalities to your cluster.
tags:
  - cloud
  - service
  - ingress
  - network
  - routing
wip: yes
---

Currently integrated:

 - [NGinX Ingress Controller](https://www.nginx.com/products/nginx/kubernetes-ingress-controller/)


# Example

```yaml
---
apiVersion: datap.io/v1alpha1
kind: ClusterFeature
metadata:
  name: ingress-system
spec:
  nginx:
    enabled: yes
```
