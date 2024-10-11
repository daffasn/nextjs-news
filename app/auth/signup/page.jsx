"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormButton from '@/components/FormButton'

import { signUpSchema } from "@/lib/zod"
import { handleSignUp } from "@/lib/register"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import AlertError from "@/components/AlertError"

const SignUpPage = () => {

  const [error, setError] = useState('')

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (values) => {
    try {
      const result = await handleSignUp(values)
      if (result.success) {
        console.log("Account created successfully.");
        await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false
        });
        
        router.push('/')

    } else {
        setError(result.message)
    }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
    <Card>
      <CardHeader>
        {error && (
          <AlertError>
            {error}
          </AlertError>
        )}
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Create your account here. After that you will be sign in directly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name..." {...field} />
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
                <Input type="email" placeholder="Your Email..." {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your Password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password again..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton loading={form.formState.isSubmitting}>
          Sign Up
        </FormButton>
      </form>
    </Form>
      </CardContent>
    </Card>
    </div>
  )
}

export default SignUpPage
