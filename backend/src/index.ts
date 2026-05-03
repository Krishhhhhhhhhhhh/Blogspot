import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user.js'
import { blogRouter } from './routes/blog.js'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

app.use('*', cors({
  origin: [
    'https://bloggerhub-git-master-krishnas-projects-fa14a608.vercel.app',
    'http://localhost:5173'
  ],
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}))

// ✅ Correct preflight handler
app.options('*', (c) => {
  return c.body(null, 204);
});

app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app