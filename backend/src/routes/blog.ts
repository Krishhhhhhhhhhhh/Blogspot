import { PrismaClient } from '../generated/prisma';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import jwt from 'jsonwebtoken';
import { createBlogInput, updateBlogInput } from 'medium-commonjs-krishna';

type Variables = {
  userId: string;
};

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

export const blogRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

// Lazy-loaded singleton PrismaClient
let prismaClient: ReturnType<typeof createPrismaClient> | null = null;
let cachedDatabaseUrl: string = '';

const createPrismaClient = (databaseUrl: string) => {
  return new PrismaClient({
    datasourceUrl: databaseUrl,
  }).$extends(withAccelerate());
};

const getPrismaClient = (databaseUrl: string) => {
  // Recreate if URL changed or if client doesn't exist
  if (!prismaClient || cachedDatabaseUrl !== databaseUrl) {
    cachedDatabaseUrl = databaseUrl;
    prismaClient = createPrismaClient(databaseUrl);
  }
  return prismaClient;
};

// Auth middleware for protected routes (only POST and PUT)
const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();
  
  if (!token) {
    c.status(401);
    return c.json({
      message: "Unauthorized: No token provided"
    });
  }
  
  try {
    const user = jwt.verify(token, c.env.JWT_SECRET) as { id: number };
    c.set("userId", user.id.toString());
    await next();
  } catch (e) {
    c.status(401);
    return c.json({
      message: "Unauthorized: Invalid token"
    });
  }
};

// GET all blogs (public)
blogRouter.get('/bulk', async (c) => {
  try {
    const prisma = getPrismaClient(c.env.DATABASE_URL)!;
    const blogs = await prisma.blog.findMany();
    
    return c.json({
      blogs
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error fetching blogs",
      error: e instanceof Error ? e.message : String(e)
    });
  }
});

// GET single blog (public)
blogRouter.get('/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrismaClient(c.env.DATABASE_URL)!;
    
    const blog = await prisma.blog.findUnique({
      where: { id }
    });
    
    if (!blog) {
      c.status(404);
      return c.json({
        message: "Blog post not found"
      });
    }
    
    return c.json({
      blog
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error fetching blog post",
      error: e instanceof Error ? e.message : String(e)
    });
  }
});

// POST create blog (protected)
blogRouter.post('/', authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct :("
      })
    }
    const prisma = getPrismaClient(c.env.DATABASE_URL)!;
    
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: parseInt(c.get("userId"))
      }
    });
    
    return c.json({
      id: blog.id
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error creating blog post",
      error: e instanceof Error ? e.message : String(e)
    });
  }
});

// PUT update blog (protected)
blogRouter.put('/:id', authMiddleware, async (c) => {
  try {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message:"Inputs not correct :("
      })
    }
    const id = parseInt(c.req.param('id'));
    const prisma = getPrismaClient(c.env.DATABASE_URL)!;
    
    const blog = await prisma.blog.update({
      where: { id },
      data: {
        ...(body.title && { title: body.title }),
        ...(body.content && { content: body.content })
      }
    });
    
    return c.json({
      id: blog.id
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error updating blog post",
      error: e instanceof Error ? e.message : String(e)
    });
  }
});