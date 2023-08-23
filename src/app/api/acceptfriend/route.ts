import { prisma } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function POST(req: Request, res: Response) {

    try {
        const session = await getServerSession(authOptions)
        if(!session) return new Response('Not allowed', {status: 500})
        
        const body = await req.json()
        const { senderId } = body;
        const { user } = session
    
    
        // Update friendRequest
        await prisma.friendRequest.update({
            where: {
                senderId: senderId
            },
            data: {
                status: 'Accepted'
            }
        })
    
        // Create a friendship between user1 and user2
        const friendship1 = await prisma.friendShip.create({
        data: {
            user1: { connect: { id: user.id } },
            user2: { connect: { id: senderId } }
        }
        });
    
        // Create a friendship between user2 and user1
        const friendship2 = await prisma.friendShip.create({
        data: {
            user1: { connect: { id: senderId } },
            user2: { connect: { id: user.id } }
        }
        });
    
        console.log('Friendships created:', friendship1, friendship2);

        return new Response('OK')
    } catch (error) {
        console.log(error)
    }

 }