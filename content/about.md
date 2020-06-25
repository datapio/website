---
title: "About"
toc: yes
wip: yes
---

# Why Datapio ?

## History lesson

 - Docker:
    - developers can focus on writing business code
    - packagers can focus on packaging applications
    - operators can focus on deploying applications

 - Kubernetes:
    - operators can describe the whole infrastructure in YAML
    - orchestrate clusters and docker containers

 - CI/CD:
    - packaging and deployment automated
    - glue all aspects of a project's lifecycle together

 - Micro Services:
    - divide your application into decoupled services
    - business code complexity decreased
    - infrastructure complexity increased:
        - service mesh
        - auto discovery
        - api gateway

 - Event Sourcing:
    - immutable databases
    - complex event processing
    - infrastructure flexibility/decoupling increased
    - infrastructure complexity increased

## Goals

 - provide cloud provisionning and CI/CD to support such an infrastructure
 - reduce infrastructure complexity with abstraction and automation
 - designed as a SaaS solution

## Non-Goals

 - create a black-box tool, abstraction is here to simplify not obfuscate
 - force a particular CI/CD workflow
