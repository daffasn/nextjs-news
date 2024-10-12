import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import UserProfile from '@/components/UserProfile'
import { cookies } from 'next/headers'

const getUser = async (id) => {
  try {
      const data = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`, {
        headers: { Cookie: cookies().toString() },
        cache: "no-store",
      })

      const res = await data.json()
      
      return res
  } catch (error) {
      console.log(error)
  }
}


const UserProfilePage = async() => {

  const session = await getServerSession(authOptions)
  
  const user = await getUser(session?.user?.id)

  const provider = session?.user?.provider

  return (
    <div>
      <UserProfile profile={user} provider={provider} />
    </div>
  )
}

export default UserProfilePage