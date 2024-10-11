import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UserProfile from '@/components/UserProfile'

const UserProfilePage = async() => {

  const session = await getServerSession(authOptions)
  

  return (
    <div>
      <UserProfile profile={session} />
    </div>
  )
}

export default UserProfilePage