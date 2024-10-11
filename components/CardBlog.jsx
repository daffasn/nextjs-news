"use client"

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Image from 'next/image'
import { Button } from './ui/button'
import Link from 'next/link'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import AvatarUserFallback from './AvatarUserFallback'
import UserPostFallback from './UserPostFallback'
import PostImageFallback from './PostImageFallback'
import { useSession } from 'next-auth/react'
import DeletePost from './DeletePost'

const CardBlog = ({post}) => {

  const {status, data:session} = useSession()

  return (
    <div>
       <Card className="max-h-[630px] h-[630px] overflow-hidden flex flex-col justify-between">
        <CardHeader className="flex flex-col justify-center items-center">
            <CardTitle>
                {status === 'loading' ? (
                  <PostImageFallback />
                ) : post?.image ? (
                  <Image
                    src={post?.image}
                    height={350}
                    width={350}
                    alt={post.title}
                    className='bg-white max-w-[350px] max-h-[350px]'
                  /> 
                ) : (
                  <Image
                    src="/assets/No_image.png"
                    height={350}
                    width={350}
                    alt={post.title}
                    className='bg-white'
                  />
                )}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <CardTitle className="mb-3">
              <Link href={`/post/${post.id}`}>
                {post?.title?.slice(0,80)}
              </Link>
            </CardTitle>
            <Link href={`/category/${post?.catName}`} className='border-2 border-black hover:bg-black hover:text-white  dark:border-white p-1 rounded-md dark:hover:bg-white dark:hover:text-black'>{post?.catName}</Link>
            <CardDescription className="mt-3">
                {post?.content?.length > 100 ? (
                  post?.content?.slice(0, 100) + "..."
                ) : (
                  post?.content
                )}
            </CardDescription>
        </CardContent>
        <CardFooter>
          <div className='flex justify-between w-full'>
            {status === 'loading' && post?.author?.image? (
              <UserPostFallback />
            ) : (
            <div className='flex items-center gap-4'>
              <Avatar className={`${post?.author?.image ? '' : 'hidden'}`}>
              <AvatarImage src={post?.author?.image} alt={post.title} />
              <AvatarFallback>
                <AvatarUserFallback />
              </AvatarFallback>
              </Avatar>
              <span>{post?.author?.name.length > 20 ? post?.author?.name.slice(0, 20) + '...' : post?.author?.name}</span>
            </div>
            )}


            <div className={`${session?.user?.email !== post?.authorEmail ? 'hidden' : ''} flex gap-1`}>
              <Button asChild>
              <Link href={`/edit-post/${post.id}`}>Edit</Link>
              </Button>
              <DeletePost id={post?.id} publicId={post?.publicId}>
                Delete
              </DeletePost>
            </div>
          </div>
        </CardFooter>
      </Card>
      
    </div>
  )
}

export default CardBlog