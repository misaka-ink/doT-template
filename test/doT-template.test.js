/**
 * @file (doT-template.test)
 * Created by Xinyi on 2019-04-29.
 */

import Koa from 'koa'
import fetch2 from '@misaka.ink/fetch2'
import doT from '../lib/index'

// fetch2
const f2 = fetch2.getInstance()

// dot templates
const templates = [
    {
        url: 'http://localhost:3000/test',
        template: `<h1>Hello {{=it.name}}, here is user template</h1>`,
        datapath: 'user'
    }
]

f2.use(doT(templates))

// mock server
const app = new Koa()

app.use(async (ctx, next) => {
    await next()
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
})

app.use(async ctx => {
    ctx.body = {
        user: {
            name: 'Mine'
        }
    }
})

let server

// start
beforeAll(async done => {
    server = await app.listen(3000)
    done()
})

// close
afterAll(async done => {
    await server.close()
    done()
})

describe('use fetch2 doT-template middleware', function () {
    test('should return html code of the user template with username', async () => {
        try {
            const result = await f2.request('http://localhost:3000/test')
            return expect(result).toEqual('<h1>Hello Mine, here is user template</h1>')
        } catch (e) {
            throw e
        }
    })
})
