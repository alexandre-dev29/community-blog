"use client"

import React from "react"
import {useRouter} from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"
import {useCreate, useUpdate} from "@refinedev/core"
import {Loader2, LogIn, Save} from "lucide-react"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {ICategory} from "@/types/categories"
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
  categoryName: z
    .string()
    .min(2, {message: "The category must have at least 2 characters"}),
  categoryDescription: z.string().min(40, {
    message: "The category description must have at least 40 character",
  }),
  mainImageUrl: z.string().url({message: "Please write a correct url"}),
})

const EditCategoryForm = ({
                            categoryInitialData,
                          }: {
  categoryInitialData: ICategory
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryName: categoryInitialData.categoryName,
      categoryDescription: categoryInitialData.categoryDescription,
      mainImageUrl: categoryInitialData.mainImageUrl,
    },
  })
  const {isLoading, mutate, isSuccess} = useUpdate()
  const router = useRouter()

  function onSubmit({
                      categoryName,
                      categoryDescription,
                      mainImageUrl,
                    }: z.infer<typeof formSchema>) {
    mutate(
      {
        resource: "categories",
        values: {categoryName, categoryDescription, mainImageUrl},
        id: categoryInitialData.id,
      },
      {
        onSuccess: async (data) => {
          await router.push("/dashboard/categories")
        },
      }
    )
  }

  return (
    <Card className={"w-[90vw]"}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">
          Edit category : {categoryInitialData.categoryName}
        </CardTitle>
        <CardDescription>
          Enter details below for the category you needs to create
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className={"grid grid-cols-2 gap-12"}>
              <FormField
                control={form.control}
                name="categoryName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Flutter, DotNet" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mainImageUrl"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Category Image Url</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: https://google.com" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />

              <div className={"col-span-2"}>
                <FormField
                  control={form.control}
                  name="categoryDescription"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Category Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
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

export default EditCategoryForm
