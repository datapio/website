+++
title = "Simple Engine"
description = "Deploy the business code of your engine"
date = 2019-12-04T11:30:05+01:00
weight = 40
draft = false
bref = "Deploy the business code of your engine"
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

    handle_message: async (state, message) => {
        const result = {}
        // ...
        return result
    }
}
```
