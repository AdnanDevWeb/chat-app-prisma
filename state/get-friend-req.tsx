import { useQuery } from '@tanstack/react-query'
import { FriendRequest, User } from '@prisma/client'
import { prisma } from '@/lib/db'
import { useUser } from './user-state'
import axios from 'axios'

export const useGetFriendsRequests = () => {
    const {data: user} = useUser()
    return useQuery({
        queryKey: ['friendRequests', user?.email],
        queryFn: async () => {
            console.log('fetching requests')


            if(!user) return []

            const res = await fetch(`/api/getfriendreqs?userEmail=${user.email}`)

            const friendRequestsSenders = ( await res.json() ) as User[] | null

            console.log(friendRequestsSenders, ' the friend ressdfeieifnifhfihefifhifh')

            if(!friendRequestsSenders) return []
            return friendRequestsSenders as User[]
        }
    })
}