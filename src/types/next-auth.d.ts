import { Account, Session as PrismaSession } from "@prisma/client";
import { User } from "next-auth";
import type { Session } from 'next-auth'

declare module 'next-auth'{
    interface Session{
        user: User & {
            id: string;
            name: string
            email: string;
            image: string;
            bio: string;
            emailVerified: Date | null;
        }
    }
}

