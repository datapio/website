---
title: Messaging System
abstract: |
  Integrate common Message Bus techonologies in your cluster.
tags:
  - cloud
  - service
  - event-sourcing
  - messaging
wip: yes
---

Currently integrated:

 - [RabbitMQ Operator](https://github.com/indeedeng/rabbitmq-operator/)

# Example

```yaml
---
apiVersion: datap.io/v1alpha1
kind: ClusterFeature
metadata:
  name: mq-system
spec:
  rabbitmq:
    enabled: yes
```
