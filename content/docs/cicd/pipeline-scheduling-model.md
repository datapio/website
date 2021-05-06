---
title: "Pipeline Scheduling Model"
abstract: |
  Learn more about how **Datapio** enables concurrency,
  archiving and garbage collection for *Tekton* pipelines
toc: yes
tags:
  - opencore
  - pipeline
  - concurrency
wip: yes
---

# Overview

With *Tekton*, you can define your pipelines as `Pipeline` resources, and
trigger their execution with a `PipelineRun`.

{{< figure "/media/docs/tekton-pipeline-model.png" "50%" >}}

**Datapio** introduces the `PipelineRunServer` and `PipelineRunRequest` resources.

The server provides the concurrency settings, such as:

 - maximum number of concurrent `PipelineRun`
 - maximum number of completed `PipelineRun` to keep

The request defines:

 - a reference to the server that must process this request
 - a reference to the pipeline that must be run
 - a listing of all the resources that must be created for the `PipelineRun` (and deleted with it)

{{< figure "/media/docs/datapio-pipeline-model.png" "50%" >}}

Once a `PipelineRunRequest` is added to the cluster, the operator immediatly sends the request
to a [RabbitMQ](https://www.rabbitmq.com) queue, consumed by the server's workers.

{{< figure "/media/docs/datapio-pipeline-workflow.png" "80%" >}}

# Examples

```yaml
---
apiVersion: datap.io/v1alpha1
kind: PipelineRunServer
metadata:
  name: my-server
  namespace: default
spec:
  max_concurrent_jobs: 1
  history: 10
```

```yaml
---
apiVersion: datap.io/v1alpha1
kind: PipelineRunRequest
metadata:
  name: my-request
  namespace: default
spec:
  pipeline: pipeline0
  server: my-server
  extraResources:
    - apiVersion: v1
      kind: ConfigMap
      metadata:
        name: my-request-cmap
      data:
        hello: world
```
