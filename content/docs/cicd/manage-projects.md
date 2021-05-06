---
title: "Manage projects"
abstract: |
  **Datapio** provides a Kubernetes operator for `Project` resources.
  Learn more about what they do and how to use them.
seeAlso:
  - /docs/cicd/pipeline-scheduling-model
  - /docs/cicd/pipeline-as-code
tags:
  - opencore
  - project
toc: yes
wip: yes
---

# Overview

**Datapio** provides the resource `Project`, which defines a set of webhooks. Each webhook has distinct
concurrency settings, and a distinct `PipelineRunServer` will be deployed for each.

Alongside the `PipelineRunServer`, will be deployed *Tekton* resources to configure the webhook and
create the continuous pipeline.

{{< figure "/media/docs/project-workflow.png" >}}

The continuous pipeline is composed of:

 - 1 `PersistentVolumeClaim` as workspace
 - 2 `Task`:
    - checkout the repository from the SCM inside the workspace
    - run the pipeline code from the repository inside the workspace

# Example

```yaml
---
apiVersion: datap.io/v1alpha1
kind: Project
metadata:
  name: my-project
  namespace: default
spec:
  webhooks:
    - name: default
      max_concurrent_jobs: 10
      history: 10
      workspace:
        storage_size: 1G
        storage_class: default
```
