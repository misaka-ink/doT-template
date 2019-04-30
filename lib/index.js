/**
 * @file fetch2 middle - support doT.js template engine
 * Created by Xinyi on 2019-04-29.
 */

import doT from 'dot'

class Template {
    constructor(url, template, datapath) {
        this.url = url
        this.template = doT.template(template)
        this.datapath = response => datapath.split('.').reduce((result, current) => result[current], response)
    }

    render(data) {
        return this.template(this.datapath(data))
    }
}

export default function (kvs) {
    kvs = kvs instanceof Array ? kvs : [kvs]
    const templates = {}
    for (const kv of kvs) {
        templates[kv.url] = new Template(kv.url, kv.template, kv.datapath)
    }
    return async function (ctx, next) {
        await next()
        if (templates[ctx._request.url]) {
            const instance = templates[ctx._request.url]
            ctx.response = instance.render(ctx.response)
        }
    }
}
