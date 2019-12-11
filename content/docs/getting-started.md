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

Datapio is a framework used to automate 80% of the generic use cases you may
encounter in the life cycle of your project, and configure the remaining 20%. It
abstracts common actions in a fully automated process, such as:

 - continuous integration and deployment of your business code
 - automated generation of the infrastructure used to run your business code
 - multi-environment support based on your preferred Git flow

### Datapio OpenCore

Designed for Kubernetes, *Datapio OpenCore* provides a wide set of pre-configured
technologies to help you alleviate the workload needed to get your application up
and running:

 - **Consul** & **Vault**: for secret storage
 - **Vault Kubernetes Engine**: for secret injection into your pods and deployments
 - **Cert Manager** & **Vault PKI Engine**: for automated certificate generation for your ingresses
 - **TektonCD**: for automated pipelines execution and management
 - **Nexus**: for internal artifact storage

### Datapio MicroService

Built on top of *Datapio OpenCore*, the *MicroService* feature provides you the
ability to ship only the business code implementing the logic of your service.
Let *Datapio* take care of:

 - boilerplate code generation
 - secret injection into your business code
 - infrastructure automated deployment, containing:
    - a **PostgreSQL** database
    - a **Prisma** exposing the database to your business code via a *GraphQL* API
    - an **API** service, running your business code
 - exposition through HTTPS, behind an **OAuth2** proxy, handling for you the authentication process

### Datapio Pipelines

Also built on top of *Datapio OpenCore*, the *Pipelines* feature brings complex
event processing to your projects. Relying on **RabbitMQ**, *Datapio* provides
you 2 resources:

 - Engine:
    - listen for one or more routing keys on the exchange ``datapio.engines``
    - process received messages using your business code
    - emit results with a single routing key on the exchange ``datapio.engines``
 - Router:
    - listen for one or more routing keys on the exchange ``datapio.engines``
    - try to match the received message against a set of filters
    - emit the message on the routing key of the first matching filter

Just like the *MicroService* feature, the following is automatically taken care
of:

 - boilerplate code generation
 - secret injection into your business code
 - infrastructure automated deployment, containing:
    - **RabbitMQ** exchanges and queues
    - **Engine** consumers, running your business code
    - **Router** consumers

Engines and routers can be chained to create pipelines that are fed messages via
an HTTPS endpoint, publishing messages on the exchange ``datapio.engines`` with
the routing key ``datapio.incomming``.

### What's next ?

Feel free to dive deep into the documentation to learn more about the architectural
design of Datapio, or read the tutorials on how to use it.
