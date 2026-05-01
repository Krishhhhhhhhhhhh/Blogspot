import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { withAccelerate } from '@prisma/extension-accelerate'
import jwt from 'jsonwebtoken'
import { userRouter } from './routes/user.js'
import { blogRouter } from './routes/blog.js'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET:string
  }
}>()

// Enable CORS for frontend
app.use('*', cors({
  origin: 'http://localhost:5173',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Content-Length'],
  exposeHeaders: ['Content-Type', 'Content-Length'],
  credentials: true,
  maxAge: 86400,
}))

// Middleware to handle empty body for OPTIONS requests
app.use('*', async (c: any, next: any) => {
  if (c.req.method === 'OPTIONS') {
    return c.text('', 200)
  }
  await next()
})

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);





export default app