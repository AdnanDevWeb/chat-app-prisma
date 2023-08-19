import TopBar from '@/components/ui/topbar'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {

  const session = await getServerSession(authOptions)
  if(!session) redirect('/signin')
  console.log(session.user.id);
  return (
      <div className='grid grid-cols-[300px,1fr]'>
        <div>
          <TopBar session={session.user} />
        </div>
        <div className='flex justify-center items-center'>
          Select a chat
        </div>
      </div>
  )
}
