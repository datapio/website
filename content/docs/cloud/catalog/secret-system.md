---
title: Secret System
abstract: |
  Enhance your cluster's security with TLS certificate and secret management.
tags:
  - cloud
  - service
  - secret-management
  - certificate
wip: yes
---

Currently integrated:

 - [Cert Manager](https://cert-manager.io/)
 - [KubeVault](https://kubevault.com)

# Example

```yaml
---
apiVersion: datap.io/v1alpha1
kind: ClusterFeature
metadata:
  name: secret-system
spec:
  certmanager:
    enabled: yes
  kubevault:
    enabled: yes
```
