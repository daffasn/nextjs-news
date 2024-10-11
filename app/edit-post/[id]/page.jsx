import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { notFound } from 'next/navigation'
import EditPost from '@/components/EditPost'

const getPost = async(id) => {
  try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/${id}`, {
          cache: 'no-store'
      })

      if (res.ok) {
          const post = await res.json()
          return post
      }
  } catch (error) {
      console.log(error)
  }
}

const page = async({params}) => {

  const session = await getServerSession(authOptions)

  const id = params.id
  const post = await getPost(id)

  if (post.authorEmail !== session?.user?.email) {
    return notFound()
  }

  return (
    <div>
      <EditPost post={post} />
    </div>
  )
}

export default page