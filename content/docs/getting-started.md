+++
title = "Getting Started"
description = "Quick introduction to Datapio"
date = 2019-11-29T20:32:00+01:00
weight = 10
draft = false
bref = "Quick introduction to Datapio"
toc = true
+++

### Introduction

Datapio is composed of 3 main features:

 - **OpenCore**: providing a Continuous Integration & Deplooyment platform
 - **MicroServices**: providing a micro-service generation tool
 - **Pipelines**: providing a Complex Event Processing pipeline generation tool

### What is OpenCore ?

By plugging your Github repository to a Datapio project, you are able to deploy automatically your artifacts to your project environments.

The `datapio.yml` file, that lies at the root of your repository, declares which branch is bound to which environment, as well as all the
provided artifacts that must be deployed in that environment.

The following kind of artifacts are currently supported:

 - NPM package
 - Docker image
 - Helm chart

*Datapio OpenCore* is based on the following third-party technologies:

 - each pipeline is implemented with [TektonCD](https://tekton.dev/)
 - each artifact will be pushed to an internal [Nexus](https://sonatype.com/nexus-repository-oss)
 - secrets are managed with [Vault](https://www.vaultproject.io/)
 - global configuration is stored in [Consul](https://www.consul.io/)
 - certificate generation is done with [Cert Manager](https://cert-manager.io/) through the [Vault PKI Engine](https://www.vaultproject.io/docs/secrets/pki/index.html)

Each project has its own *Kubernetes namespace* where a webhook is deployed upon project's creation. This webhook will trigger the correct pipeline in that namespace.
Every project's environment has its own namespace as well, where *Helm* charts will be deployed.

### What is MicroServices ?

In Datapio, a micro-service is defined by:

 - a data model
 - an API schema
 - business code implementing the business logic of the service
 - which other APIs it consumes

Such a definition is done with a custom *Kubernetes* resource `MicroService`. The creation of such a resource will trigger build and deployment pipelines to
automatically deploys the infrastructure needed by the service, such as:

 - a [PostgreSQL]() database
 - a [Prisma]() exposing the database through a [GraphQL]() API, and syncing the datamodel with the database
 - an endpoint serving the *GraphQL* API schema, integrating the business code
 - a certificate authenticating the service

Secrets needed for the infrastructure are automatically generated, stored in the *Vault* and injected into the business code.

*NB:* Custom secrets can be added to the *Vault* and will be injected into the business code.

An *API Gateway* is provided to expose your micro-services to the rest of your cluster, allowing:

 - rate limiting and quota management
 - [OAuth2]() & [OpenID Connect]() encapsulation

### What is Pipelines ?

In Datapio, Complex Event Processing is done through a pipeline of engines, each consuming messages from [RabbitMQ]().

An engine is defined by:

 - a set of routing keys to listen for
 - the routing key emitted by the engine
 - business code implementing the business logic of the service
 - which APIs it consumes

Such a definition is done with a custom *Kubernetes* resource `Engine`. The creation of such a resource will trigger build and deployment pipelines to
automatically deploys the infrastructure needed by the enngine, such as:

 - the *RabbitMQ* exchanges and queues
 - a daemon consuming the *RabbitMQ* queue, processing the message with the integrated business code, and producing a message to the *RabbitMQ* exchange

Secrets needed for the infrastructure are automatically generated, stored in the *Vault* and injected into the business code.

*NB:* Custom secrets can be added to the *Vault* and will be injected into the business code.
