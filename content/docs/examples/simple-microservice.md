+++
title = "Simple Micro-Service"
description = "Deploy the business code of your micro-service"
date = 2019-12-04T11:30:01+01:00
weight = 30
draft = false
bref = "Deploy the business code of your micro-service"
toc = true
+++

### Business code

```js
module.exports = {
    initialize: async () => {
        const state = {}
        // ...
        return state
    },

    terminate: async (state) => {
        // ...
    },

    resolvers: async (state) => ({
        Query: {
            books: async (parent, args, context, info) => {
                return await context.prisma.books(info)
            }
        }
    }),

    directives: async (state) => ({
        dummy: async (next, source, args, context) => {
            return await next()
        }
    })
}
```
