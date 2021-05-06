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

### Hooks

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

### Configuration

#### Options

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `url` | string | `amqp://guest:guest@localhost:5672/` | URL to the AMQP server |
| `exchanges` | Map&lt;string, [Exchange](#exchange)&gt; | `{}` | Exchanges by name |
| `queues` | Map&lt;string, [Queue](#queue)&gt; | `{}` | Queues by name |
| `publishers` | Map&lt;string, [QueuePublisher](#queuepublisher) or [ExchangePublisher](#exchangepublisher)&gt; | `{}` | Publishers by name |
| `consumers` | Map&lt;string, [Consumer](#consumer)&gt; | `{}` | Consumers by consumed queue name |

#### Exchange

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | string | `"topic"` | [AMQP Exchange Type](https://www.rabbitmq.com/tutorials/amqp-concepts.html#exchanges) |
| `options` | [AMQPLib Exchange Options](https://www.squaremobius.net/amqp.node/channel_api.html#channel_assertExchange) | `{durable: false}` | AMQP Exchange options |

#### Queue

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bindings` | Array&lt;[QueueBinding](#queuebinding)&gt; | `[]` | Binding configuration |
| `options` | [AMQPLib Queue Options](https://www.squaremobius.net/amqp.node/channel_api.html#channel_assertQueue) | `{durable: false}` | AMQP Queue options |

#### QueueBinding

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `exchange` | string | `"default"` | Exchange to bind the queue to |
| `routingKey` | string | `"#"` | Routing Key to bind the queue to |

#### QueuePublisher

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `queue` | string | N/A | Target queue name |

#### ExchangePublisher

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `exchange` | string | N/A | Target exchange name |
| `routingKey` | string | N/A | Routing Key to publish to |

#### Consumer

A consumer is a function with the following signature:

```javascript
async function consumerHandler(publishers, message)
```

Where the `publishers` object maps the declared publisher names to a function
with the following signature:

```javascript
async function publisherHandler({ message, props })
```

Where `message` is the message to send, and `props` is the message properties
(see [this page](https://www.squaremobius.net/amqp.node/channel_api.html#channel_publish)).

**NB:** If the handler throws an error, the message will be rejected and the AMQP
server will re-add it to the queue.

### Complete Example

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
