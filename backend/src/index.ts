import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user.js'
import { blogRouter } from './routes/blog.js'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
    ALLOWED_ORIGINS: string
  }
}>()

app.use('*', cors({
  origin: (origin) => {
    const allowed = [
      'https://blogspot-flame.vercel.app',
      'http://localhost:5173'
    ]
    if (!origin) return ''
    return allowed.includes(origin) ? origin : ''
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app