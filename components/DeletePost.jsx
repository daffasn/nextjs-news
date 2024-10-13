"use client"

import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { postDelete } from '@/lib/actions'
import { useRouter } from 'next/navigation'
import FormButton from './FormButton'
import toast from 'react-hot-toast'

const DeletePost = ({children, id, publicId}) => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [publicIdTemp, setPublicIdTemp] = useState(publicId)

  const router = useRouter()

  const handleDelete = async (e) => {
    e.preventDefault()

    setIsSubmitting(true)

    if (publicId) {
      try {
        const res = await fetch('/api/removeImage', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({publicIdTemp})
        })
    
        if (res.ok) {
          console.log('Image Deleted!')
        }
      } catch (error) {
        console.log(error)
      }
  }

    try {
      const res = await postDelete(id)
      
      if (res.success) {
        console.log('SUCCESS')
        router.push('/')
        toast.success('Post Deleted Successfully!')
      } else {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-500 hover:bg-red-700 text-black dark:text-white">{children}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form onSubmit={handleDelete}>
            <FormButton loading={isSubmitting}>
              Delete
            </FormButton>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  )
}

export default DeletePost