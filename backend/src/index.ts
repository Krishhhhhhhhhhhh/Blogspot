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

// ✅ Ping route (AFTER app creation)
app.get('/ping', (c) => {
  return c.text('PING_OK_V5')
})

console.log('CORS VERSION 5 LIVE')

// ✅ BULLETPROOF CORS FOR WORKERS
app.use('*', async (c, next) => {
  const origin = c.req.header('origin') ?? ''

  // Always set CORS headers FIRST
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  c.header('Access-Control-Max-Age', '86400')

  if (origin) {
    c.header('Access-Control-Allow-Origin', origin)
    c.header('Vary', 'Origin')
  } else {
    // Fallback for preflight without origin
    c.header('Access-Control-Allow-Origin', '*')
  }

  if (c.req.method === 'OPTIONS') {
    return c.newResponse(null, 204)
  }

  await next()
})

// Routes
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app