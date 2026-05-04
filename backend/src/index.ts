import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user.js'
import { blogRouter } from './routes/blog.js'

const app = new Hono()

app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400,
  })
)

app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app