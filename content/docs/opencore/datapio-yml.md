+++
title = "Datapio YAML file reference"
description = "Content specification"
date = 2019-12-16T15:59:00+01:00
weight = 20
draft = false
bref = "Content specification"
toc = true
markup = "mmark"
+++

{.message .focus}
### DatapioFile

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| release | string | Release name to group the artifacts |
| environments | map string to [Environment](#environment) | Project's environment definitions by environment's name |
| artifacts | [Artifact](#artifact) array | Artifacts definition |

{.message .focus}
#### Environment

> Seen in:
>  - [DatapioFile](#datapiofile)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| branch | string | Source branch for environment's deployments |

{.message .focus}
#### Artifact

> Seen in:
>  - [DatapioFile](#datapiofile)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| name | string | Artifact's name |
| type | [ArtifactType](#artifacttype) | Artifact's type |
| path | string | Path to artifact in repository |
| params | map | Mapping of keys to values (may be injected from [Consul](https://consul.io/) or [Vault](https://vaultproject.io)), will be injected into deployment pipeline |
| requires | [ArtifactRef](#artifactref) array | Requirements for deployment |

{.message .focus}
##### ArtifactType

> Seen in:
>  - [Artifact](#artifact)
>  - [ArtifactRef](#artifactref)

{.bordered .striped}
| Value |
| ----- |
| npm |
| docker |
| helm |

{.message .focus}
##### ArtifactRef

> Seen in:
>  - [Artifact](#artifact)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| name | string | Artifact's name |
| type | [ArtifactType](#artifacttype) | Artifact's type |

