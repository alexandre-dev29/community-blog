"use client"

import React from "react"
import {useRouter} from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"
import {useCreate} from "@refinedev/core"
import {Loader2, Save} from "lucide-react"
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
import {Textarea} from "@/components/ui/textarea"

const formSchema = z.object({
  fullName: z
    .string({required_error: "The full name is required "})
    .min(10, {message: "The title must have at least 10 characters"}),
  email: z.string().email({
    message: "write a correct mail",
  }),
  phoneNumber: z.string().min(5, {
    message: "write a correct phone number",
  }),

  avatarImage: z.string().url({message: "Please write a correct url"}),
  password: z.string().min(6, {message: "Please write a correct password"}),
  userTitle: z.string().min(6, {message: "Please write a correct title"}),
  biography: z
    .string()
    .min(20, {message: "Please write a correct biography"}),
})

const CreateUserForm = () => {
  const {isLoading, mutate, isSuccess} = useCreate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const router = useRouter()

  function onSubmit({}: z.infer<typeof formSchema>) {
    mutate(
      {
        resource: "posts",
        values: {},
      },
      {
        onSuccess: async (data) => {
          await router.push("/dashboard/posts")
        },
      }
    )
  }

  return (
    <Card className={"h-fit"}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create a new user</CardTitle>
        <CardDescription>
          Enter details below for the user you needs to create
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className={"grid grid-cols-2 gap-x-12 gap-y-4"}>
              <FormField
                control={form.control}
                name="fullName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Axel Mwenze" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: axel@axelmwenze.dev" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: +243970000000" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userTitle"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>User Title</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Software engineer" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatarImage"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Post Image Url</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: https://google.com" {...field} />
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
                    <FormLabel>Post Image Url</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: 123456" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="biography"
                render={({field}) => (
                  <FormItem className={"col-span-2"}>
                    <FormLabel>Post Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Write a biography" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>

            <Button className="flex gap-4 self-end" disabled={isLoading}>
              {!isLoading ? (
                <>
                  <Save/>
                  Save
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

export default CreateUserForm
