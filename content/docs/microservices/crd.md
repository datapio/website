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
### MicroService

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | MicroService |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [MicroServiceSpec](#microservicespec) | Resource specification |
| status | [MicroServiceStatus](#microservicestatus) | Resource status |

{.message .focus}
#### MicroServiceSpec

> Seen in:
>  - [MicroService](#microservice)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| package | string | Name of NPM package containing the business code |
| storage | string | Database storage size |
| datamodel | string | [Prisma Datamodel](https://www.prisma.io/docs/1.34/datamodel-and-migrations/datamodel-POSTGRES-knum/) |
| apiSchema | string | [GraphQL](https://graphql.org/learn/schema/) schema |
| params | map | Mapping of keys to values (may be injected from [Consul](https://consul.io/) or [Vault](https://vaultproject.io)), will be injected into business code |

{.message .focus}
#### MicroServiceStatus

> Seen in:
>  - [MicroService](#microservice)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| ready | boolean | Flag marking the micro-service ready to receive queries |
| databaseStatus | [DatabaseStatus](#databasestatus) | Status of `Database` resource |
| prismaStatus | [PrismaStatus](#prismastatus) | Status of `Prisma` resource |
| apiStatus | [APIStatus](#apistatus) | Status of `API` resource |

{.message .focus}
### Database

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | Database |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [DatabaseSpec](#databasespec) | Resource specification |
| status | [DatabaseStatus](#databasestatus) | Resource status |

{.message .focus}
#### DatabaseSpec

> Seen in:
>  - [Database](#database)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| storage | string | Database storage size |
| secret | string | [Secret]() name containing the database credentials |

{.message .focus}
#### DatabaseStatus

> Seen in:
>  - [MicroServiceStatus](#microservicestatus)
>  - [Database](#database)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| ready | boolean | Flag marking the database ready to receive queries |

{.message .focus}
### Prisma

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | Prisma |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [PrismaSpec](#prismaspec) | Resource specification |
| status | [PrismaStatus](#prismastatus) | Resource status |

{.message .focus}
#### PrismaSpec

> Seen in:
>  - [Prisma](#prisma)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| database | string | Name of [Database](#database) resource |
| datamodel | string | [Prisma Datamodel](https://www.prisma.io/docs/1.34/datamodel-and-migrations/datamodel-POSTGRES-knum/) |
| secret | string | [Secret]() name containing the database and Prisma credentials |

{.message .focus}
#### PrismaStatus

> Seen in:
>  - [MicroServiceStatus](#microservicestatus)
>  - [Prisma](#prisma)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| ready | boolean | Flag marking Prisma ready to receive queries |

{.message .focus}
### API

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | API |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [APISpec](#apispec) | Resource specification |
| status | [APIStatus](#apistatus) | Resource status |

{.message .focus}
#### APISpec

> Seen in:
>  - [API](#api)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| prisma | string | Name of [Prisma](#prisma) resource |
| package | string | Name of NPM package containing the business code |
| apiSchema | string | [GraphQL](https://graphql.org/learn/schema/) schema |
| params | map | Mapping of keys to values (may be injected from [Consul](https://consul.io/) or [Vault](https://vaultproject.io)), will be injected into business code |

{.message .focus}
#### APIStatus

> Seen in:
>  - [MicroServiceStatus](#microservicestatus)
>  - [API](#api)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| ready | boolean | Flag marking the API ready to receive queries |
