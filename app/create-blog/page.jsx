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
import { postCreate } from "@/lib/actions"

const CreatePostPage = () => {

    const {status} = useSession()

    const [image, setImage] = useState(null)
    const [publicId, setPublicId] = useState(null)
    const [categories, setCategories] = useState([])

    const router = useRouter()

    useEffect(() => {
        const catArr = async() => {
          const data = await fetch('/api/categories')
          const res = await data.json()
          setCategories(res)
        }
    
        catArr()
    }, [])

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
          title: '',
          content: '',
          catName: ''
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
        };
        
        try {
            const res = await postCreate(newValues)

            if (res.success) {
                console.log('SUCCESS')
                router.push('/')
                toast.success('Post Created Successfully!')
              } else {
                console.log(res.message);
              }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
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

export default CreatePostPage