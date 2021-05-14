---
weight: 3
title: "Complete Example"
abstract: |
  Sample code demonstrating all the features
seeAlso:
  - /docs/sdk/amqp-engine/configuration
  - /docs/sdk/amqp-engine/hooks
tags:
  - nodejs
  - opencore
  - sdk
  - amqp
  - rabbitmq
  - example
---

```javascript
const { Engine } = require('@datapio/sdk-amqp-engine')

class MyEngine {
  constructor() {
    super({
      url: process.env.RABBITMQ_URL,
      exchanges: {
        'foobar': {}
      },
      queues: {
        ping: {
          bindings: [
            {
              exchange: 'foobar',
              routingKey: 'ping'
            }
          ]
        },
        pong: {
          bindings: [
            {
              exchange: 'foobar',
              routingKey: 'pong'
            }
          ]
        }
      },
      publishers: {
        pingBack: {
          exchange: 'foobar',
          routingKey: 'pong'
        }
      },
      consumers: {
        ping: async ({ pingBack }, message) => {
          await pingBack({ message })
        }
      }
    })
  }

  async afterDeclare() {
    console.log("Exchanges and Queues created")
  }

  async beforeConsume() {
    console.log("Start consuming")
  }

  async beforeShutdown() {
    console.log("Stopped consuming")
  }
}

const main = async () => {
  const engine = new MyEngine()
  await engine.declare()
  await engine.consume()

  // wait 5 minutes
  await new Promise(resolve => setTimeout(resolve, 5 * 60 * 1000))

  await engine.shutdown()
}

main()
```
