---
weight: 2
title: "Hooks"
abstract: |
  Extend the engine's behavior
seeAlso:
  - /docs/sdk/amqp-engine/configuration
tags:
  - nodejs
  - opencore
  - sdk
  - amqp
  - rabbitmq
  - hooks
---

The `Engine` class provides 3 hooks:

```javascript
class MyEngine extends Engine {
  constructor() { /* ... */ }

  async afterDeclare() {
    // called after this.declare()
  }

  async beforeConsume() {
    // called before this.consume()
  }

  async beforeShutdown() {
    // called before this.shutdown()
  }
}
```
