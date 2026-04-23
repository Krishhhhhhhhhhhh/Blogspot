import { z } from 'zod';
export const signupInput = z.object({
    username: z.email(),
    password: z.string().min(6),
    name: z.string().optional()
});
export const signinInput = z.object({
    username: z.email(),
    password: z.string().min(6)
});
export const createBlogInput = z.object({
    username: z.email(),
    content: z.string()
});
export const updateBlogInput = z.object({
    username: z.email(),
    content: z.string()
});
//# sourceMappingURL=index.js.map