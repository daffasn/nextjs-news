import React from 'react'
import { Skeleton } from './ui/skeleton'

const UserFallback = () => {
  return (
    <div>
        <Skeleton className='h-16 w-40 sm:w-52 rounded-md flex items-center gap-3 p-4 cursor-wait'>
            <Skeleton className="h-10 w-14 rounded-full" />
            <Skeleton className="h-5 w-full rounded-md" />
        </Skeleton>
    </div>
  )
}

export default UserFallback