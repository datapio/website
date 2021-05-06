---
title: "Kubernetes Operator"
abstract: |
  The easy way to interact with your Kubernetes cluster.
seeAlso: []
tags:
  - nodejs
  - opencore
  - sdk
  - kubernetes
  - operator
toc: yes
---

### Overview

The **Datapio SDK Kubernetes Operator** provides:

 - a `kubectl`-like interface to the Kubernetes API
 - a declarative way to watch Kubernetes resources
 - hooks to implement liveness and readiness probes and a [Prometheus](https://prometheus.io) metric exporter
 - custom HTTP API
 - custom GraphQL endpoint

### Installation

```bash
$ npm install @datapio/sdk-k8s-operator
```
