import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export async function PUT(req: Request, res: Response){
    const session = getServerSession(authOptions)
    if(!session) new Response('Not allowed', {status: 500})
}