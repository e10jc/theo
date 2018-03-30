import {graphiqlKoa, graphqlKoa} from 'apollo-server-koa'
import * as Koa from 'koa'
import * as BodyParser from 'koa-bodyparser'
import * as Favicon from 'koa-favicon'
import * as Passport from 'koa-passport'
import * as Router from 'koa-router'
import * as Session from 'koa-session'
import * as Next from 'next'

import schema from './graphql-schema'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = Next({dev})
const handle = nextApp.getRequestHandler()

nextApp.prepare()
.then(() => {
  const app = new Koa()
  const router = new Router()

  app.use(Favicon(__dirname + '/public/favicon.ico'))

  app.use(BodyParser())

  app.keys = [process.env.SESSION_SECRET]
  app.use(Session(app))
  app.use(Passport.initialize())
  app.use(Passport.session())

  router.post('/graphql', graphqlKoa({schema}))
  router.get('/graphiql', graphiqlKoa({endpointURL: '/graphql'}))

  router.get('/:slug', async ctx => {
    await nextApp.render(ctx.req, ctx.res, '/theory', Object.assign({}, ctx.params, ctx.query))
    ctx.respond = false
  })

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  app.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  app.use(router.routes())
  app.use(router.allowedMethods())

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
