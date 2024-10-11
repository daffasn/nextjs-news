"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import ImageUploadFallback from "./ImageUploadFallback"
import { userUpdateSchema } from "@/lib/zod"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import FormButton from "./FormButton"
import Image from "next/image"
import { BadgeInfo } from "lucide-react"


import { CldUploadButton } from 'next-cloudinary'
import { useEffect, useState } from "react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import AlertError from "./AlertError"

const UserProfile = ({profile}) => {

  useEffect(() => {
    const pubId = async() => {
      const data = await fetch(`/api/user/${profile.user.id}`)
      const res = await data.json()
      setPublicId(res.publicId)
      setImage(res.image)
      setPublicIdTemp(res.publicId)
    }

    pubId()
  }, [profile.user.id])
  

    const [image, setImage] = useState(null)
    const [publicId, setPublicId] = useState(null)
    const [publicIdTemp, setPublicIdTemp] = useState(null)

    const [error, setError] = useState('')

    const {status, update} = useSession()

    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(userUpdateSchema),
        defaultValues: {
          name: profile.user.name,
          email: profile.user.email
        }
    })

    const handleImageUpload = (result) => {
      const info = result.info

      if ('secure_url' in info && 'public_id' in info) {
        const url = info.secure_url
        const public_id = info.public_id
        setImage(url)
        setPublicId(public_id)
      }
    }

    const onSubmit = async(values) => {
      const newValues = {
        ...values,
        image: image,
        publicId: publicId,
      }

        if (newValues.publicId !== publicIdTemp) {
          try {
            const res = await fetch('/api/removeImage', {
              method: 'POST',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({publicIdTemp})
            })
        
          } catch (error) {
            console.log(error)
          }
        }
    
        
        try {
            const res = await fetch(`/api/user/${profile.user.id}`, {
              method: 'PUT',
              headers: {
                "Content-type": "application/json" 
              },
              body: JSON.stringify(newValues)
            })

            if (res.ok) {
                console.log('SUCCESS');
                update({name: newValues.name, email: newValues.email, image: newValues.image })
                router.push('/')
                toast.success('Profile Edited Successfully!')
              } else {
                const errorData = await res.json()
                console.log('Error:', errorData.message);
                setError(errorData.message)
              }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
          {error && (
            <AlertError>
              {error}
            </AlertError>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col gap-2">
                    <FormLabel>Password</FormLabel>
                    {profile?.user?.provider === 'google' && (
                      <FormLabel>
                      <Alert>
                        <div className="flex items-center gap-2">
                          <BadgeInfo className="h-8 w-8" />
                          <AlertDescription>
                          You are using Google account for sign in to this website. You can set up the password as you want and you also can sign in with two methods, Google account or sign in page.
                          </AlertDescription>
                        </div>
                      </Alert>
                      </FormLabel>
                    )}
                    </div>
                    <FormControl>
                      <Input type="password" placeholder="Your New Password..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {status === 'loading' ? (
                <ImageUploadFallback />
              ) : (
                <CldUploadButton uploadPreset="knour2v7" className="min-h-48 w-full border-2 border-dotted border-black rounded-md grid place-items-center bg-slate-100" onSuccess={handleImageUpload}>
                {image ? (
                    <div className="">
                      <Image src={image} height={150} width={150} alt={profile.user.name} />
                    </div>
                ) : (
                  <div className='flex flex-col items-center'>
                    <Image src="/assets/user-avatar.png" height={50} width={50} alt="User Image" />
                    <span className="text-black">No Image. Upload your image!</span>
                  </div>
                )}
              </CldUploadButton>
              )}

              <FormButton loading={form.formState.isSubmitting}>
                  Submit
              </FormButton>
            </form>
          </Form>
        </div>
      )
}

export default UserProfile
