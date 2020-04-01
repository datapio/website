+++
title = "How-To: Deploy Datapio OpenCore"
description = "Guide and documentation"
date = 2020-01-13T14:58:12+01:00
weight = 10
draft = false
bref = "Guide and documentation"
toc = true
+++

### Prerequisites

 - [Ansible](https://www.ansible.com), **>=2.9**
 - [Kubernetes](https://kubernetes.io), **>=1.14**
 - an `Ingress` controller such as [NGinx](https://kubernetes.github.io/ingress-nginx/)
 - a load balancer for your `LoadBalancer` services (especially the `Ingress` controller)
 - [kubectl](https://kubernetes.io/fr/docs/reference/kubectl/overview/), **>=1.14**
 - [Helm](https://helm.sh), **>=2.16**

*NB: [Minikube](https://minikube.sigs.k8s.io/) and [kind](https://kind.sigs.k8s.io/)
are supported but you will have to manually provide the `Ingress` controller
requirements (the load balancer).*

### Create your playbook

```shell
$ mkdir playbook
$ cd playbook
$ cat > requirements.yml <<EOF
---
- src: https://github.com/datapio/ansible-role-opencore.git
  version: master
  name: datapio-opencore
EOF
$ cat > site.yml <<EOF
---
- name: deploy datapio
  hosts: all
  roles:
    - datapio-opencore
EOF
$ cat > inventory.yml <<EOF
---
all:
  hosts:
    deploy-node:
      ansible_connection: local
      datapio_namespace: datapio
      datapio_domain: datap.io
      datapio_root_ca:
        pub: "<base64 encoded public key>"
        priv: "<base64 encoded private key>"
EOF
```

### Run the playbook

```shell
$ ansible-galaxy install -r requirements.yml
$ ansible-playbook site.yml -i inventory.yml
```
