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
    title: z.string().min(1),
    content: z.string().min(1)
});
export const updateBlogInput = z.object({
    title: z.string().min(1).optional(),
    content: z.string().min(1).optional()
});
//# sourceMappingURL=index.js.map