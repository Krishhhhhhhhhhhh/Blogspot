import { Hono } from 'hono'
import { userRouter } from './routes/user.js'
import { blogRouter } from './routes/blog.js'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
    ALLOWED_ORIGINS: string
  }
}>()

app.use('*', async (c, next) => {
  const origin = c.req.header('origin')
  const allowedOrigins = c.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  
  if (origin && allowedOrigins.includes(origin)) {
    c.header('Access-Control-Allow-Origin', origin)
  }
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  if (c.req.method === 'OPTIONS') {
    return new Response(null, { status: 200 })
  }
  
  await next()
})

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app