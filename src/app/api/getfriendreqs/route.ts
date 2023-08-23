import { prisma } from "@/lib/db";
import { FriendRequest, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){



    try{
        const params = req.nextUrl.searchParams
        
        const userEmail = params.get('userEmail')
        
        const friendRequests = await prisma.friendRequest.findMany({
            where: {
                emailToAdd: userEmail as string
            }
        }) as FriendRequest[] | null
        
        if(!friendRequests) return NextResponse.json([])
        
        const requestsSender: User[] = [];
        
        for( const friendRequest of friendRequests ) {
            if(friendRequest.status === 'Accepted') return
            const sender = await prisma.user.findUnique({
                where: {
                    id: friendRequest.senderId
                }
            }) as User
            
            requestsSender.push(sender)
        }
        console.log('senders:', requestsSender)

        return NextResponse.json(requestsSender)
    }
    catch(err){
        console.log(err)
    }
}