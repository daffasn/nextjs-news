"use client"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useRouter, usePathname } from "next/navigation"

import SignInPage from "./signin/page"
import SignUpPage from "./signup/page"
import { useState } from "react"
import { useSession } from "next-auth/react"

const Page = () => {

  const {status} = useSession()
  
  const router = useRouter()
  

  const pathname = usePathname()
  const setPathPage = pathname.slice(6, 12).toString()

  const [currPage, setCurrPage] = useState(setPathPage)
  const [loading, setLoading] = useState(false)

  const handleTabChange = (value) => {
    setCurrPage(value)
    setLoading(true)
    
    if (value === 'signin') {
      router.replace('/auth/signin')
    } else if (value === 'signup') {
      router.replace('/auth/signup')
    }

    setLoading(false)
      
  }
  

  return (
    <div className="flex justify-center">
    {loading ? (
        <h1>Loading...</h1>
    ) : (
        <Tabs defaultValue={currPage} className="w-[400px]" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">
                Sign In
            </TabsTrigger>
            <TabsTrigger value="signup">
                Sign Up
            </TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <SignInPage />
            </TabsContent>
            <TabsContent value="signup">
                <SignUpPage />
            </TabsContent>
        </Tabs>
    )}
    </div>
  )
}

export default Page
