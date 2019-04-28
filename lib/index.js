/**
 * @file fetch2 middle - support doT.js template engine
 * Created by Xinyi on 2019-04-29.
 */

import doT from 'dot'

class Template {
    constructor(path, template) {
        this.path = path
        this.template = doT.template(template)
    }
}

export default function (kvs) {
    kvs = kvs instanceof Array ? kvs : [kvs]
    const templates = {}
    for (const kv of kvs) {

        new Template(kv.url, kv.template)

        templates[kv.url] = {}
        templates[kv.url].template = kv.template && doT.template(kv.template)
        templates[kv.url].path = function (value, response) {
            return value.split('.').reduce((result, val) => result[val], response)
        }.bind(null, kv.path)
    }
    return async function (ctx, next) {
        await next()
        if (templates[ctx.request.url] && templates[ctx.request.url].template) {
            const item = templates[ctx.request.url]
            ctx.response = item.template(item.path(ctx.response))
        }
    }
}
