---
title: "Continuous Integration and Deployment"
abstract: |
  Get started with pipelines as code to setup easy, flexible
  and reusable automation.
toc: yes
---

### Overview

Based on [Tekton](https://tekton.dev), **Datapio** provides a CI/CD platform with:

 - project management
 - webhook generation
 - concurrency settings
 - resources creation and garbage collection
 - history limitation
 - pipeline as code support

### Setup

Prerequisites:

 - [Helm 3](https://helm.sh)
 - [RabbitMQ](https://www.rabbitmq.com)
 - [Vault](https://vaultproject.io)
 - [Tekton](https://tekton.dev)

#### Get the source code

The source code is hosted on [Github](https://github.com/datapio/opencore):

    $ git clone https://github.com/datapio/opencore.git datapio-opencore
    $ cd datapio-opencore

#### Create a dedicated namespace

Using your preferred method, create the following namespace:

```yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: datapio-control-plane
```

#### Install operators

First, the **PipelineRunServer Operator**:

    $ helm install \
        pipelinerunserver-operator \
        ./charts/pipelinerunserver-operator \
        --namespace datapio-control-plane

| Values | Description |
| ------ | ----------- |
| `replicaCount` | Number of replicas in the cluster (only one supported) |
| `operator.image.name` | Docker image name for the operator itself |
| `operator.image.tag` | Docker image version |
| `operator.image.pullPolicy` | Kubernetes Pull Policy for image |
| `archiver.image.name` | Docker image name for the archiver |
| `archiver.image.tag` | Docker image version |
| `archiver.image.pullPolicy` | Kubernetes Pull Policy for image |
| `worker.image.name` | Docker image name for the workers |
| `worker.image.tag` | Docker image version |
| `worker.image.pullPolicy` | Kubernetes Pull Policy for image |
| `rabbitmq.url_secret` | Name of Kubernetes Secret containing a key `url` |
| `rabbitmq.admin_secret` | Name of Kubernetes Secret containing the keys `protocol`, `host`, `port`, `username`, `password`, and `vhost` 

*See default values [here](https://github.com/datapio/opencore/blob/feature/refactor/charts/pipelinerunserver-operator/values.yaml)*

Then, the **Project Operator**:

    $ helm install \
        datapio-project-operator \
        ./charts/project-operator \
        --namespace datapio-control-plane

| Values | Description |
| ------ | ----------- |
| `replicaCount` | Number of replicas in the cluster (only one supported) |
| `operator.image.name` | Docker image name for the operator itself |
| `operator.image.tag` | Docker image version |
| `operator.image.pullPolicy` | Kubernetes Pull Policy for image |
| `tasks.git.image.name` | Docker image name for the *Tekton* `Task` git cloning your repository |
| `tasks.git.image.tag` | Docker image version |
| `tasks.pipelineExec.image.name` | Docker image name for the *Tekton* `Task` executing your pipeline's code |
| `tasks.pipelineExec.image.tag` | Docker image version |
| `tasks.yarn.image.name` | Docker image name for for the *Tekton* `Task` yarn installing your pipeline's dependencies) |
| `sidecars.docker.image.name` | Docker image name for the tasks sidecar container running a Docker server |
| `sidecars.docker.image.tag` | Docker image version |
| `vault_secret` | Name of Kubernetes Secret containing the keys `VAULT_ADDR`, `VAULT_ROLE` and `VAULT_K8S_MOUNT_POINT` |

*See default values [here](https://github.com/datapio/opencore/blob/feature/refactor/charts/project-operator/values.yaml)*
