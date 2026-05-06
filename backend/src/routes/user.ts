import { getPrisma } from "../lib/prisma"
import { Hono } from "hono";
import jwt from 'jsonwebtoken'
import {signupInput, signinInput} from "medium-commonjs-krishna"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const result = signupInput.safeParse(body);
  
  if(!result.success){
    c.status(411);
    return c.json({
      message: "Inputs not correct :("
    })
  }
  
  const prisma = getPrisma(c.env.DATABASE_URL)

  let token: string

  try {
    const user = await prisma.user.create({
      data: {
        username: result.data.username,
        password: result.data.password,
        name: result.data.name
      }
    })
    
    token = jwt.sign({
      id: user.id
    }, c.env.JWT_SECRET)

  } catch(e) {
    console.log(e)
    c.status(411);
    return c.json({ message: 'User already exists :(' })
  }

  return c.json({ jwt: token });
});
//signin
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const result = signinInput.safeParse(body);
  
  if(!result.success){
    c.status(411);
    return c.json({
      message: "Inputs not correct :("
    })
  }
  
  const prisma = getPrisma(c.env.DATABASE_URL)

  let token: string

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: result.data.username,
        password: result.data.password
      }
    })

    if(!user){
      c.status(403);
      return c.json({
        message: "Incorrect creds"
      })
    }
    
    token = jwt.sign({
      id: user.id
    }, c.env.JWT_SECRET)

  } catch(e) {
    console.log(e)
    c.status(411);
    return c.json({ message: 'Invalid credentials' })
  }

  return c.json({ jwt: token });
});