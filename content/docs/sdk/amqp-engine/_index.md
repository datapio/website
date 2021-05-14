---
title: "AMQP Engine"
abstract: |
  Create AMQP producers and/or consumers declaratively
seeAlso: []
tags:
  - nodejs
  - opencore
  - sdk
  - amqp
  - rabbitmq
toc: yes
---

### Overview

The **Datapio SDK AMQP Engine** provides a declarative way to setup AMQP
exchanges, queues, producers and consumers.

### Installation

```bash
$ npm install @datapio/sdk-amqp-engine
```

### Usage

The SDK provides an `Engine` class that you can inherit from:

```javascript
const { Engine } = require('@datapio/sdk-amqp-engine')

class MyEngine extends Engine {
  constructor() {
    super({
      /* options */
    })
  }
}
```

You can then instantiate and use your engine:

```javascript
const engine = new MyEngine()

// setup exchanges and queues
await engine.declare()

// start consuming in background
await engine.consume()

// will stop consuming and close the connection
await engine.shutdown()
```
