+++
title = "Vault"
description = ""
date = 2019-12-17T22:44:33+01:00
weight = 30
draft = false
bref = ""
toc = true
+++

### Introduction

[Homepage](https://vaultproject.io)

### Usage within Datapio

 - secret storage for projects
 - uses [Consul](/docs/opencore/base/consul/) as storage backend
 - Kubernetes authentication method enabled for secret injections into pods and [TektonCD](/docs/opencore/base/tekton/) pipelines
 - PKI secret engine enabled for automated certificate generation with [Cert Manager](/docs/opencore/base/cert-manager/)
