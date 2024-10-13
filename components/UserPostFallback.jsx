import React from 'react'
import { Skeleton } from './ui/skeleton'

const UserPostFallback = () => {
  return (
    <div className='h-16 w-36 sm:w-52 rounded-md flex items-center gap-3 cursor-wait'>
        <Skeleton className="h-10 w-14 rounded-full" />
        <Skeleton className="h-5 w-full rounded-md" />
    </div>
  )
}

export default UserPostFallback