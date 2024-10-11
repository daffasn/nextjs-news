"use client"

import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signIn } from 'next-auth/react'

const SignInGoogle = () => {
  return (
    <div className='w-full flex justify-center'>
        <Button onClick={() => signIn("google")} className="flex items-center gap-2 mb-5">
            <div className='text-2xl'>
                <FcGoogle />
            </div>
            <span>Sign In with Google</span>
        </Button>
    </div>
  )
}

export default SignInGoogle