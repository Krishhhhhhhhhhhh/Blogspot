import { PrismaClient } from '../generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const getPrisma = (databaseUrl: string) => {
  return new PrismaClient({
    datasourceUrl: databaseUrl,
  }).$extends(withAccelerate())
}