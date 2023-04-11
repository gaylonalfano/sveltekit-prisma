// NOTE Hunter does a slightly different approach than JoyOfCode
// Hunter adds a prisma.ts file (this one) with a few more settings
// REF: https://youtu.be/UMpKaZy0Rpc?t=355
import { PrismaClient } from '@prisma/client';
import { env } from "$env/dynamic/private";

const prisma = global.__prisma || new PrismaClient();

if (env.NODE_ENV === "development") {
  global.__prisma = prisma;
}

export { prisma }

