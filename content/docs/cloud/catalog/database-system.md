---
title: Database System
abstract: |
  Add the ability to provision managed databases and handle
  backups.
wip: yes
---

Currently integrated:

 - [KubeDB](https://kubedb.com)

# Example

```yaml
---
apiVersion: datap.io/v1alpha1
kind: ClusterFeature
metadata:
  name: database-system
spec:
  kubedb:
    enabled: yes
```
