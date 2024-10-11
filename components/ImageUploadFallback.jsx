import React from 'react'
import { Skeleton } from './ui/skeleton'

const ImageUploadFallback = () => {
  return (
    <div>
      <Skeleton className="min-h-48 w-full cursor-wait" />
    </div>
  )
}

export default ImageUploadFallback