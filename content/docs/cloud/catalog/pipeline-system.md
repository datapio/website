---
title: Pipeline System
abstract: |
  Start automating your workflow by adding the basic CI/CD
  building blocks to your cluster.
tags:
  - cloud
  - service
  - pipeline
  - workflow
wip: yes
---

Currently integrated:

 - [TektonCD](https://tekton.dev)

# Example

```yaml
---
apiVersion: datap.io/v1alpha1
kind: ClusterFeature
metadata:
  name: pipeline-system
spec:
  tekton:
    enabled: yes
```
