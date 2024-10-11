import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const AvatarUserFallback = () => {
  return (
    <div>
      <Skeleton className="h-12 w-12 rounded-full" />
    </div>
  )
}

export default AvatarUserFallback
