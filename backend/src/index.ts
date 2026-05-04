import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user.js'
import { blogRouter } from './routes/blog.js'

const app = new Hono()

app.use(
  '/api/*',
  cors({
    origin: [
      'https://blogspot-flame.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  })
)

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app