import { useQuery } from '@tanstack/react-query'
import { User } from '@prisma/client'

export const useUser = () => {
    return useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            console.log('fetching user')
            const res = await fetch('/api/getCurrentUser', {cache: 'no-store'})
            const user = await res.json()
            return user as User | undefined
        }
    })
}










