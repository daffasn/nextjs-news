"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { signInSchema } from "@/lib/zod"
import FormButton from "@/components/FormButton"
import SignInGoogle from "@/components/SignInGoogle"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import AlertError from "@/components/AlertError"

const SignInPage = () => {

  const [error, setError] = useState('')
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async(values) => {
    try {
        const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        })
        
        if (res.ok) {
            router.push('/')
        } else if (res.error) {
            setError('Email or Password was incorrect!')
        }
        
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <Card>
    <CardHeader>
        {error && (
          <AlertError>
            {error}
          </AlertError>
        )}
      <CardTitle>Sign In</CardTitle>
      <CardDescription>
        You can sign in here if you already have an account.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
    <SignInGoogle />
    <div className="relative">
    <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or continue with</span></div></div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email..." {...field} />
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
                <Input type="password" placeholder="Your password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton loading={form.formState.isSubmitting}>
          Sign In
        </FormButton>
      </form>
    </Form>
    </CardContent>
    </Card>
  )
}

export default SignInPage
