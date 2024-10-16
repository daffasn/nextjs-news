import React from 'react'
import { Skeleton } from './ui/skeleton'

const PostImageFallback = () => {
  return (
    <div>
        <Skeleton className="h-[350px] w-[250px] sm:w-[350px]" />
    </div>
  )
}

export default PostImageFallback