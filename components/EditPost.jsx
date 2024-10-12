"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import ImageUploadFallback from "@/components/ImageUploadFallback"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import FormButton from "@/components/FormButton"
import Image from "next/image"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { CldUploadButton } from 'next-cloudinary'
import { useEffect, useState } from "react"
import { postSchema } from "@/lib/zod"
import { postEdit } from "@/lib/actions"
import toast from "react-hot-toast"

const EditPost = ({post}) => {
    const {status} = useSession()

    const [image, setImage] = useState(post?.image)
    const [publicId, setPublicId] = useState(null)
    const [publicIdTemp, setPublicIdTemp] = useState(null)

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(post.catName)

    const router = useRouter()

    useEffect(() => {
        const catArr = async() => {
          const data = await fetch('/api/categories')
          const res = await data.json()
          setCategories(res)
        }
    
        catArr()
    }, [post.catName])

    useEffect(() => {
        const pubId = async() => {
          const data = await fetch(`/api/post/${post.id}`)
          const res = await data.json()
          setPublicId(res.publicId)
          setPublicIdTemp(res.publicId)
          setSelectedCategory(res.catName)
        }
    
        pubId()
    }, [post.id])

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
          title: post.title,
          content: post.content,
          catName: selectedCategory
        }
    })

    useEffect(() => {
        form.reset({
            title: post.title,
            content: post.content,
            catName: post.catName,
        });
    }, [form, post.title, post.content, post.catName]);


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
            id: post.id,
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
          
              if (res.ok) {
                console.log('Image Deleted!')
              }
            } catch (error) {
              console.log(error)
            }
        }
        
       try {
        const res = await postEdit(newValues)

        if (res) {
          console.log('FORM SUBMITTED')
          toast.success('Post Edited Successfully!')
          router.push('/')
        }
       } catch (error) {
        console.log(error);
       }
       
    }

  return (
    <div>
      <h1>{publicIdTemp}</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Input the title..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="Input the content..."
                        className="resize-y"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="catName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {categories.map((item) => (
                            <SelectItem key={item.id} value={item.catName}>{item.catName}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
            />

            {status === 'loading' ? (
                <ImageUploadFallback />
              ) : (
                <CldUploadButton uploadPreset="knour2v7" className="min-h-48 w-full border-2 border-dotted border-black rounded-md grid place-items-center bg-slate-100" onSuccess={handleImageUpload}>
                    {image ? (
                      <div>
                        <Image src={image} height={150} width={150} alt="Image-Blog" />
                      </div>
                    ) : (
                      <div className='flex flex-col items-center'>
                        <Image src="/assets/No_image.png" height={100} width={100} alt="User Image" />
                      <span className="text-black">Upload your image!</span>
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

export default EditPost