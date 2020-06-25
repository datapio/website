---
title: Datapio OpenCore
abstract: |
  Host a complete CI/CD platform with **Pipeline As Code** support.
seeAlso:
  - /docs/cicd/manage-projects
  - /docs/cicd/pipeline-scheduling-model
wip: yes
---

# Example

```yaml
---
apiVersion: datap.io/v1alpha1
kind: ClusterFeature
metadata:
  name: datapio-opencore
spec:
  pipelinerunserver:
    enabled: yes
  project:
    enabled: yes
```
