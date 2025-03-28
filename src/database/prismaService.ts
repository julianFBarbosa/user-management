declare global {
    var prisma: PrismaClient;
}
import { Prisma, PrismaClient } from "@prisma/client";

export type UserCreateInput = Prisma.UserCreateInput

export type UserAuthenticationCreateInput = Prisma.UserAuthenticationCreateInput

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;