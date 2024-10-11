import React from 'react'
import { Skeleton } from './ui/skeleton'

const PostFallback = () => {
  return (
    <div className='flex flex-col gap-8 mt-10'>
        <Skeleton className='h-8 w-full' />

        <div className='flex flex-col gap-2'>
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-full' />
        </div>
    </div>
  )
}

export default PostFallback