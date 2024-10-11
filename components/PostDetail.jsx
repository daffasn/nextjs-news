"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import AvatarUserFallback from './AvatarUserFallback'
import UserPostFallback from './UserPostFallback'
import PostImageFallback from './PostImageFallback'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { FormattedDate } from '@/lib/date'
import PostDateFallback from './PostDateFallback'
import PostFallback from './PostFallback'

const PostDetail = () => {
    const {status} = useSession()
    const pathname = usePathname()
    const getDetailPath = pathname.slice(6)
    
    const [post, setPost] = useState({})

    useEffect(() => {
        const getPost = async() => {
            try {
                const data = await fetch(`/api/post/${getDetailPath}`)
                const res = await data.json()

                setPost(res)
            } catch (error) {
                console.log(error)
            }
        }

        getPost()
    }, [getDetailPath]) 

  return (
    <div>
      <div className='flex justify-between items-center mb-10'>
        <span>
        {status === 'loading' ? (
            <UserPostFallback />
          ) : (
          <div className='flex items-center gap-4'>
            <Avatar className={`${post?.author?.image ? '' : 'hidden'}`}>
            <AvatarImage src={post?.author?.image} alt={post.title} />
            <AvatarFallback>
              <AvatarUserFallback />
            </AvatarFallback>
            </Avatar>
            <span>{post?.author?.name}</span>
          </div>
          )}
        </span>
        <span>
            {status === 'loading' ? (
                <PostDateFallback />
            ) : (
                FormattedDate(post?.createdAt)
            )}
        </span>
      </div>
      <div className='flex justify-center'>
        {status === 'loading' ?
        (
            <PostImageFallback />
        ) : post?.image ? (
            <Image 
            src={post.image}
            height={500}
            width={500}
            alt='content-image'
            className='bg-white max-w-[1000px] max-h-[1000px]'
            />
        ) : (
            <Image 
            src="/assets/No_image.png"
            height={500}
            width={500}
            alt='content-image'
            className='bg-white'
            />
        )}
      </div>

      {status === 'loading' ? (
          <PostFallback />
      ) : (
      <div className='flex flex-col gap-4 mt-10'>
        <h1 className='text-2xl font-bold'>{post?.title}</h1>
        <p>{post?.content}</p>
      </div>
      )}
      

    </div>
  )
}

export default PostDetail