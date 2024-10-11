"use client"

import React from 'react'
import Link from 'next/link'
import { Button } from './ui/button'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ModeToggle } from './ModeToggle'
import AvatarUserFallback from './AvatarUserFallback'
import { FaHome } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import UserFallback from './UserFallback'
import { MdFormatAlignCenter } from "react-icons/md";

import { useSession, signOut } from 'next-auth/react'

const Navbar = () => {

  const { status, data: session } = useSession()
  

  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col'>
        <Link href='/' className='text-4xl font-bold'>
            <span className='underline underline-offset-[3.4px]'>Next Blog</span>
            <span>.</span>
        </Link>
        <span className='hidden md:block text-sm font-light w-96 mt-3 text-muted-foreground'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, doloribus? Blanditiis perferendis dolorum quos molestias illum, repudiandae nemo pariatur vel!
        </span>
        <span>{session?.account?.type}</span>
      </div>
      <div>

        {status === 'loading' ? (
          <UserFallback />
        ) : session ? (
          <div>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button className="h-16 flex gap-1 max-w-52 truncate text-wrap">
                <Avatar className={`${session?.user?.image ? 'hidden' : ''}`}>
                  <AvatarImage src="/assets/user-avatar.png" alt={session?.user?.name} className="bg-white" />
                  <AvatarFallback>
                    <AvatarUserFallback />
                  </AvatarFallback>
                </Avatar>
                <Avatar className={`${session?.user?.image ? '' : 'hidden'}`}>
                  <AvatarImage src={session?.user?.image} alt={session?.user?.name} />
                  <AvatarFallback>
                    <AvatarUserFallback />
                  </AvatarFallback>
                </Avatar>
                <span className='text-base'>{session?.user?.name.length > 30 ? session?.user?.name.slice(0, 30) + '...' : session?.user?.name}</span>
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-center">
              <DropdownMenuLabel className="text-center">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
                <ModeToggle width="w-full" />
              <DropdownMenuItem>
                  <Link href='/user/profile' className='w-full flex justify-center items-center gap-2'>
                    <RiUserSettingsFill />
                    <span>
                      Profile
                    </span>
                  </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                  <Link href='/dashboard' className='w-full flex justify-center items-center gap-2'>
                    <FaHome />
                    <span>
                      Dashboard
                    </span>
                  </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                  <Link href='/create-blog' className='w-full flex justify-center items-center gap-2'>
                    <MdFormatAlignCenter />
                    <span>
                      Add Post
                    </span>
                  </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                  <Button onClick={() => signOut()} className="w-full">
                    Sign Out
                  </Button>
              </DropdownMenuItem>
          </DropdownMenuContent>
          </DropdownMenu>
          </div>
        ) : (
          <div className={`flex gap-2 ${session ? 'hidden' : ''}`}>
            <ModeToggle />
            <Button asChild>
              <Link href="/auth/signin" className='text-xl'>Sign In</Link>
            </Button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Navbar
