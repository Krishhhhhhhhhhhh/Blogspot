import { z } from 'zod'

export const signupInput = z.object({
  username: z.email(),
  password: z.string().min(6),
  name: z.string().optional()
})


export const signinInput = z.object({
  username: z.email(),
  password: z.string().min(6)
})
export const createBlogInput = z.object({
  username: z.email(),
  content: z.string()
})
export const updateBlogInput = z.object({
  username: z.email(),
  content: z.string()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>

