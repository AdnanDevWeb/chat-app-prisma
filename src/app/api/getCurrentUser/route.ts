import { prisma } from "@/lib/db";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(req: Request, res: Response){

    try{
        const session = await getServerSession(authOptions)
    
        if(!session) NextResponse.json({text: 'Ayo not allowed'})
    
        const currentUser = await prisma.user.findUnique({
            where: {id: session?.user.id}
        })

        console.log(currentUser)
        return NextResponse.json(currentUser)
    }catch(err){
        console.log(err)

        return NextResponse.json({text: 'ayo, there is an error'})
    }
}