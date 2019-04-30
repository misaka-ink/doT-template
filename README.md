# doT-template
Fetch2 middleware - support doT.js template engine

## Install

```bash
npm install --save @misaka.ink/dot-template
```

## Examples

```javascript
import fetch2 from '@misaka.ink/fetch2'
import doT from '@misaka.ink/dot-template'

// fetch2
const f2 = fetch2.getInstance()

// dot templates
/*
 data = {
    user: {
        name: 'Mine'
    }
 }
  */

const templates = [
    {
        url: '/example',
        template: `<h1>Hi {{=it.name}}</h1>`,
        datapath: 'user'
    }
]

f2.use(doT(templates))

// Todo -> request
// f2.request('/example')
```

## doT.js Wiki

> https://github.com/olado/doT
