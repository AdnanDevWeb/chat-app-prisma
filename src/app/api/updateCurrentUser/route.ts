import { prisma } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { z } from "zod";

type req = {
    name: string,
    bio: string,
    image: string
}

export async function POST(req: Request){
    
    try {
        const session = await getServerSession(authOptions)
        if(!session) new Response('Not allowed', {status: 500})

        const body = (await req.json()) as req

        const {name, bio, image} = z.object({ name: z.string(), bio: z.string(), image: z.string().url() }).parse(body)

        const updatedUser = await prisma.user.update({
            where: {
                id: session!.user.id
            },
            data: {
                name: name,
                bio: bio,
                image: image,
            }
        })

        console.log(updatedUser)
        return new Response('OK')
    } catch (error) {
        return new Response('Not okay')
    }
}