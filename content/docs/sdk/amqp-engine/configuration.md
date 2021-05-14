---
weight: 1
title: "Configuration"
abstract: |
  Description of the expected constructor options
seeAlso:
  - /docs/sdk/amqp-engine/hooks
tags:
  - nodejs
  - opencore
  - sdk
  - amqp
  - rabbitmq
  - configuration
toc: yes
---

### Options

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `url` | string | `amqp://guest:guest@localhost:5672/` | URL to the AMQP server |
| `exchanges` | Map&lt;string, [Exchange](#exchange)&gt; | `{}` | Exchanges by name |
| `queues` | Map&lt;string, [Queue](#queue)&gt; | `{}` | Queues by name |
| `publishers` | Map&lt;string, [QueuePublisher](#queuepublisher) or [ExchangePublisher](#exchangepublisher)&gt; | `{}` | Publishers by name |
| `consumers` | Map&lt;string, [Consumer](#consumer)&gt; | `{}` | Consumers by consumed queue name |

### Exchange

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | string | `"topic"` | [AMQP Exchange Type](https://www.rabbitmq.com/tutorials/amqp-concepts.html#exchanges) |
| `options` | [AMQPLib Exchange Options](https://www.squaremobius.net/amqp.node/channel_api.html#channel_assertExchange) | `{durable: false}` | AMQP Exchange options |

### Queue

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bindings` | Array&lt;[QueueBinding](#queuebinding)&gt; | `[]` | Binding configuration |
| `options` | [AMQPLib Queue Options](https://www.squaremobius.net/amqp.node/channel_api.html#channel_assertQueue) | `{durable: false}` | AMQP Queue options |

### QueueBinding

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `exchange` | string | `"default"` | Exchange to bind the queue to |
| `routingKey` | string | `"#"` | Routing Key to bind the queue to |

### QueuePublisher

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `queue` | string | N/A | Target queue name |

### ExchangePublisher

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `exchange` | string | N/A | Target exchange name |
| `routingKey` | string | N/A | Routing Key to publish to |

### Consumer

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
