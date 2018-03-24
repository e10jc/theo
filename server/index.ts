import {graphqlKoa, graphiqlKoa} from 'apollo-server-koa'
import * as Koa from 'koa'
import * as BodyParser from 'koa-bodyparser'
import * as Router from 'koa-router'
import * as Next from 'next'
import {builder} from 'objection-graphql'

import * as Models from '../models'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = Next({dev})
const handle = app.getRequestHandler()

const schema = builder()
  .model(Models.Theory, {fieldName: 'theory', listFieldName: 'theories'})
  .build()

app.prepare()
.then(() => {
  const server = new Koa()
  const router = new Router()

  router.post('/graphql', BodyParser(), graphqlKoa({schema}))
  router.get('/graphql', graphqlKoa({schema}))
  router.get('/graphiql', graphiqlKoa({endpointURL: '/graphql'}))

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.use(router.allowedMethods())
  
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})