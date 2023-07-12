"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useLogin} from "@refinedev/core"
import {Loader2, LogIn} from "lucide-react"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
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
import {Input} from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email({message: "Please write a correct email address"}),
  password: z
    .string()
    .min(6, {message: "Your password must have at least 6 character"}),
})
export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const {mutate: login, isLoading} = useLogin<z.infer<typeof formSchema>>({})

  function onSubmit({email, password}: z.infer<typeof formSchema>) {
    login({email, password})
  }

  return (
    <Card className={"w-[30vw]"}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password below to login
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="a@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} type={"password"}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <Button className="flex w-full gap-4" disabled={isLoading}>
              {!isLoading ? (
                <>
                  <LogIn/>
                  Login
                </>
              ) : (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Please wait
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
