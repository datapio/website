---
title: "Pipeline As Code"
abstract: |
  Complex pipelines made easy, portable and reusable.
  Learn more about the syntax and architecture.
seeAlso:
  - /docs/cicd/manage-projects
tags:
  - opencore
  - pipeline
toc: yes
---

# Overview

**Datapio** relies on [NodeJS](https://nodejs.org) to run the pipeline.
Its code is executed in a sandboxed environment.

A pipeline **SHOULD** declare:

 - a name
 - a set of tools used by the pipeline to interact with other softwares such as:
    - [Docker](https://www.docker.com)
    - [Tekton](https://tekton.dev)
    - [Vault](https://vaultproject.io)
    - [Helm](https://helm.sh)
    - [Git](https://git-scm.com)
    - ...
 - an environment (constructed using the set of tools)
 - a list of stages, representing the steps of your pipeline

# Creating your pipeline

The pipeline's entrypoint is located (relative to the root of your repository) by default at `.datatpio/index.js`.
This can be overridden in the project's specification.

**Example:**

```javascript
pipeline({
  name: 'Build and deploy my webservice',
  tools: [
    'docker',
    'git',
    // ...
  ]
  // ...
})
```

**NB:** Using the function `include` you can split your pipeline into multiple files:

```javascript
// include paths are relative to the root of your repository
const { some_stage } = include('.datapio/some.js')

pipeline({
  // ...
  stages: [
    some_stage('some param')
  ]
})
```

## Building the pipeline's environment

Using the pipeline's tools, you can create an environment that will be passed to each of your pipeline's stage.


**Example**:

```javascript
pipeline({
  // ...
  environment: async (workspace_pvc, { git }) => ({
    platform: ({ master: 'prod', dev: 'preprod' })[git.branch()] || null,
    docker_image_name: 'example/webservice',
    docker_image_tag: git.commit().sha
  }),
  // ...
})
```

The `workspace_pvc` contains the name of the `PersitentVolumeClaim` allocated for the current workspace.
It is especially useful when running a *Tekton* `Task` that needs to live in the current workspace.

**NB:** This function can return anything, no typing enforced.

## Creating your stages

Each stage contains:

 - a `script` function, describing what needs to be done to perform the stage
 - an optional `when` function, describing wether the stage should be skipped or not

**Example:**

```javascript
pipeline({
  // ...
  stages: [
    {
      name: 'Build docker image',
      script: async (env, { docker }) => {
        await docker.build({
          dockerfile: './Dockerfile',
          context: '.',
          tags: [
            `${env.docker_image_name}:${env.docker_image_tag}`,
            `${env.docker_image_name}:latest`
          ]
        })
      }
    },
    {
      name: 'Push docker image',
      when: async env => env.platform !== null,
      script: async (env, { docker, vault }) => {
        const { registry, username, password } = await vault.read(
          `secret/data/docker/${env.platform}`
        )

        await docker.push({
          registry,
          credentials: { username, password },
          tags: [
            `${env.docker_image_name}:${env.docker_image_tag}`,
            `${env.docker_image_name}:latest`
          ]
        })
      }
    },
    {
      name: 'Deploy Helm chart',
      when: async env => env.platform !== null,
      script: async (env, { helm, vault }) => {
        const { kubeconfig } = await vault.read(
          `secret/data/kubeconfig/${env.platform}`
        )

        await helm.deploy({
          chart: './chart',
          release: {
            name: 'my-webservice',
            namespace: 'default'
          },
          values: {
            image: {
              name: env.docker_iamge_name,
              tag: env.docker_image_tag
            }
          }
        })
      }
    }
  ]
})
```
