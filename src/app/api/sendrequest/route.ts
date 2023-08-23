import { prisma } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { FriendRequest } from "@prisma/client";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request, res: Response){



    try {
        const session = await getServerSession(authOptions);
    
        if(!session) return new Response('Not authorized', {status: 401})
    
        const { email: senderEmail, id: senderId } = session!.user;
    
        const body = await req.json()
        const { emailToAdd: recieverEmail } = body

        if(senderEmail === recieverEmail) return new Response('Cannot add your self', {status: 500})

        const reciever = await prisma.user.findUnique({
            where: {email: recieverEmail}
        })

        if(!reciever) return new Response("user doesn't exit", {status: 500})

        const sender = await prisma.user.findUnique({
            where: { email: senderEmail },
        });
  
        if (!sender) {
            return new Response("Sender not found", { status: 404 });
        }
        // Check if they are already friends
        const friendship = await prisma.friendShip.findFirst({
            where: {
              OR: [
                { user1Id: senderId, user2Id: reciever.id },
                { user1Id: reciever.id, user2Id: senderId }
              ]
            }
        });

        if(friendship) return new Response('Already friends', {status: 400})
        // Check if the user to add has already sent a request
        const userToAddRequested = await prisma.friendRequest.findUnique({
            where: {
                emailToAdd: senderEmail,
                senderId: reciever.id

            }
        })

        if(userToAddRequested) return new Response('This user requested you, accept it !', {status: 400})


        const hasAlreadyRequested = await prisma.friendRequest.findUnique({
            where: {
                senderId: senderId,
                emailToAdd: reciever.email
            }
        })
        if(hasAlreadyRequested) return new Response('You already requested ', {status: 400})

        await prisma.friendRequest.create({
            data: {
                sender: { connect: {id: sender.id} },
                receiver: { connect: {id: reciever.id} },
            }
        })

        return new Response('OK')
    } catch (error) {
        console.log(error)

        return new Response('Bad response', {status: 500})
    }
}