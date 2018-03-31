import {User} from './models'

export default async (ctx, next) => {
  const userId = ctx.cookies.get('id')

  if (userId) {
    const user = await User.query().findById(userId)
    ctx.user = ctx.req.user = user.toJSON()
  }

  await next()
}
