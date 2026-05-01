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
  title: z.string().min(1),
  content: z.string().min(1)
})
export const updateBlogInput = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional()
})

export type SignupInput = z.infer<typeof signupInput>
export type SigninInput = z.infer<typeof signinInput>
export type UpdateBlogInput = z.infer<typeof updateBlogInput>
export type CreateBlogInput = z.infer<typeof createBlogInput>

