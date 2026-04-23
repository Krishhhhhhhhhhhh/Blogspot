import { Hono } from 'hono'
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

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);





export default app