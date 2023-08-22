import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { createUploadthing, type FileRouter } from 'uploadthing/next'


const f = createUploadthing()
const auth = (req: Request, idToCheck: string) => ({ id: idToCheck}); // Fake auth function


async function getUser(){
    const session = await getServerSession(authOptions)
    
    return {session}
}

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB" } })
        .middleware(async ({req}) => {
            const session = await getServerSession(authOptions)

            if(!session) throw new Error('No session !')
            const user = await auth(req,session!.user.id )

            if (!user) throw new Error("Unauthorized");

            return { userId: user.id }
        } )
        .onUploadComplete( async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId)

            console.log('file url:', file.url)
        } )
} satisfies FileRouter


export type OurFileRouter = typeof ourFileRouter