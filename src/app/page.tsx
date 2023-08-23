import SideBarOptions from '@/components/sidebar/sidebarOptions'
import TopBar from '@/components/ui/topbar'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Home() {

  const session = await getServerSession(authOptions)
  if(!session) redirect('/signin')
  return (
      <div className='grid grid-cols-[300px,1fr]'>
        <div className='p-6 border-r border-solid border-gray-500'>
          <TopBar session={session.user} />
          <SideBarOptions />
        </div>
        <div className='flex justify-center items-center'>
          Select a chat
        </div>
      </div>
  )
}
