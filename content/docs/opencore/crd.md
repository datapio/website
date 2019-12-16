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
### Project

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | Project |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [ProjectSpec](#projectspec) | Resource specification |
| status | [ProjectStatus](#projectstatus) | Resource status |

{.message .focus}
#### ProjectSpec

> Seen in:
>  - [Project](#project)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| serviceAccountName | string | Name of [ServiceAccount]() owning this project |
| features | [ProjectFeature](#projectfeature) array | Features of Datapio for this project |

{.message .focus}
##### ProjectFeature

> Seen in:
>  - [ProjectSpec](#projectspec)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| name | string | Feature identifier |
| enabled | boolean | Enable/disable the feature |

{.message .focus}
#### ProjectStatus

> Seen in:
>  - [Project](#project)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| ready | boolean | Flag marking the project ready to use |

{.message .focus}
### Release

{.bordered .striped}
| Group | Version | Kind |
| ----- | ------- | ---- |
| datap.io | v1 | Release |

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| apiVersion | string | Schema version |
| kind | string | Resource type |
| metadata | [ObjectMeta](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.17/#objectmeta-v1-meta) | Resource metadata |
| spec | [ReleaseSpec](#releasespec) | Resource specification |
| status | [ReleaseStatus](#releasestatus) | Resource status |

{.message .focus}
#### ReleaseSpec

> Seen in:
>  - [Release](#release)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| source | string | TektonCD resource name ([more informations](https://github.com/tektoncd/pipeline/blob/master/docs/resources.md#git-resource)) |
| artifacts | [ArtifactSpec](#artifactspec) array | Artifacts to deploy |

{.message .focus}
##### ArtifactSpec

> Seen in:
>  - [ReleaseSpec](#releasespec)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| name | string | Artifact name |
| type | string | Artifact type |
| path | string | Path to artifact inside the Tekton resource |
| params | any | Parameters to pass to the artifact builder |

{.message .focus}
#### ReleaseStatus

> Seen in:
>  - [Release](#release)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| pipeline | [PipelineRunStatus](https://github.com/tektoncd/pipeline/blob/master/docs/pipelineruns.md) | Status of [PipelineRun]() resources created for this release |
| artifacts | [ArtifactStatus](#artifactstatus) array | Stauts of each artifact's deployment |

{.message .focus}
##### ArtifactStatus

> Seen in:
>  - [ReleaseStatus](#releasestatus)

{.bordered .striped}
| Field | Type | Description |
| ----- | ---- | ----------- |
| name | string | Artifact name |
| type | string | Artifact type |
| state | [ArtifactDeploymentState](#artifactdeploymentstate) | Current state of artifact(s deployment) |

{.message .focus}
###### ArtifactDeploymentState

> Seen in:
>  - [ArtifactStatus](#releasespec)

{.bordered .striped}
| Value |
| ----- |
| Unknown |
| Pending |
| Success |
| Fail |
