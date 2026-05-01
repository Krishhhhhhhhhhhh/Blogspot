import { z } from 'zod';
export declare const signupInput: z.ZodObject<{
    username: z.ZodEmail;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
//# sourceMappingURL=index.d.ts.map