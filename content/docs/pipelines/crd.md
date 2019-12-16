+++
title = "Custom Resource Definitions"
description = "Kubernetes resources describing desired infrastructure"
date = 2019-12-04T11:18:11+01:00
weight = 20
draft = false
bref = "Kubernetes resources describing desired infrastructure"
toc = true
markup = "mmark"
+++


{.message .focus}
### RabbitCluster

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | RabbitCluster |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [RabbitClusterSpec](#rabbitclusterspec) | Resource specification |
| status | [RabbitClusterStatus](#rabbitclusterstatus) | Resource status |

{.message .focus}
#### RabbitClusterSpec

> Seen in:
>  - [RabbitCluster](#rabbitcluster)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| nodes | [RabbitClusterNode](#rabbitclusternode) array | Cluster composition |
| secret | string | Name of [Secret]() containing RabbitMQ credentials |

{.message .focus}
##### RabbitClusterNode

> Seen in:
>  - [RabbitClusterSpec](#rabbitclusterspec)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| name | string | Erlang node name |
| storage | string | Size of persistent storage for Mnesia or `null` if it is a memory only node |

{.message .focus}
#### RabbitClusterStatus

> Seen in:
>  - [RabbitCluster](#rabbitcluster)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| ready | boolean | Flag marking the cluster ready to receive messages |

{.message .focus}
### RabbitExchange

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | RabbitExchange |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [RabbitExchangeSpec](#rabbitexchangespec) | Resource specification |
| status | [RabbitExchangeStatus](#rabbitexchangestatus) | Resource status |

{.message .focus}
#### RabbitExchangeSpec

> Seen in:
>  - [RabbitExchange](#rabbitexchange)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| type | string | [RabbitMQ exchange type]() |
| durable | boolean | Exchange durability |
| autodelete | boolean | Exchange persistance |

{.message .focus}
#### RabbitExchangeStatus

> Seen in:
>  - [RabbitExchange](#rabbitexchange)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| ready | boolean | Flag marking the exchange ready to receive messages |

{.message .focus}
### RabbitQueue

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | RabbitQueue |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [RabbitQueueSpec](#rabbitqueuespec) | Resource specification |
| status | [RabbitQueueStatus](#rabbitqueuestatus) | Resource status |

{.message .focus}
#### RabbitQueueSpec

> Seen in:
>  - [RabbitQueue](#rabbitqueue)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| durable | boolean | Queue durability |
| autodelete | boolean | Queue persistance |

{.message .focus}
#### RabbitQueueStatus

> Seen in:
>  - [RabbitQueue](#rabbitqueue)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| ready | boolean | Flag marking the queue ready to receive messages |

{.message .focus}
### RabbitBinding

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | RabbitBinding |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [RabbitBindingSpec](#rabbitbindingspec) | Resource specification |
| status | [RabbitBindingStatus](#rabbitbindingstatus) | Resource status |

{.message .focus}
#### RabbitBindingSpec

> Seen in:
>  - [RabbitBinding](#rabbitbinding)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| routing_key | string | Routing key to bind exchange to target |
| source | string | [RabbitExchange](#rabbitexchange) resource name |
| target | [RabbitBindingTarget](#rabbitbindingtarget) | Destination to route messages to |

{.message .focus}
##### RabbitBindingTarget

> Seen in:
>  - [RabbitBindingSpec](#rabbitbindingspec)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| exchange | string | [RabbitExchange](#rabbitexchange) resource name or `null` |
| queue | string | [RabbitQueue](#rabbitqueue) resource name or `null` |

{.message .focus}
#### RabbitBindingStatus

> Seen in:
>  - [RabbitBinding](#rabbitBinding)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| ready | boolean | Flag marking the binding ready to receive messages |

{.message .focus}
### Engine

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | Engine |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [EngineSpec](#enginespec) | Resource specification |
| status | [EngineStatus](#enginestatus) | Resource status |

{.message .focus}
#### EngineSpec

> Seen in:
>  - [Engine](#engine)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| package | string | Name of NPM package containing the business code |
| listen | string array | Routing keys to listen for in exchange `datapio.engines` |
| emit | string | Routing key to use when publishing in exchange `datapio.engines` |
| params | map | Mapping of keys to values (may be injected from [Consul](https://consul.io/) or [Vault](https://vaultproject.io)), will be injected into business code |

{.message .focus}
#### EngineStatus

> Seen in:
>  - [Engine](#engine)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| ready | boolean | Flag marking the engine ready to process messages |

{.message .focus}
### Router

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | Router |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [RouterSpec](#routerspec) | Resource specification |
| status | [RouterStatus](#routerstatus) | Resource status |

{.message .focus}
#### RouterSpec

> Seen in:
>  - [Router](#router)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| listen | string array | Routing keys to listen for in exchange `datapio.engines` |
| filters | [RouterFilter](#routerfilter) array | Filter to use to route messages |

{.message .focus}
##### RouterFilter

> Seen in:
>  - [RouterSpec](#routerspec)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| routing_key | string | Routing key to use when publishing message in exchange `datapio.engines` if it matches the filter |
| validates | [MongoDB-like filter](https://docs.mongodb.com/v3.2/tutorial/query-documents/#read-operations-query-argument) | Filter to test |

{.message .focus}
#### RouterStatus

> Seen in:
>  - [Router](#router)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| ready | boolean | Flag marking the router ready to route messages |
