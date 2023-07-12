"use client"

import React, {useState} from "react"
import {useRouter} from "next/navigation"
import {zodResolver} from "@hookform/resolvers/zod"
import {useCreate} from "@refinedev/core"
import {useEditor} from "@tiptap/react"
import {Loader2, Save, XOctagon} from "lucide-react"
import {useForm} from "react-hook-form"
import Balancer from "react-wrap-balancer"
import * as z from "zod"

import {ICategory} from "@/types/categories"
import {tipTapEditorConfig} from "@/config/tiptap"
import {cn} from "@/lib/utils"
import {Badge} from "@/components/ui/badge"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {Separator} from "@/components/ui/separator"
import {Textarea} from "@/components/ui/textarea"
import Tiptap from "@/components/tiptap/Tiptap"

const formSchema = z.object({
  postTitle: z
    .string({required_error: "The title is required "})
    .min(10, {message: "The title must have at least 10 characters"}),
  postDescription: z.string().min(40, {
    message: "The description must have at least 40 character",
  }),
  Tags: z.string().optional(),
  postMainImage: z.string().url({message: "Please write a correct url"}),
  categoryId: z.string({required_error: "Please select a category"}),
})

const CreatePostForm = ({categoryList}: { categoryList: ICategory[] }) => {
  const [postTags, setPostTags] = useState<string[]>([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const editor = useEditor(tipTapEditorConfig(""))
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postTitle: "",
      postDescription: "",
      postMainImage: "",
    },
  })
  const {isLoading, mutate, isSuccess} = useCreate()
  const router = useRouter()

  function onSubmit({
                      postTitle,
                      postMainImage,
                      postDescription,
                      categoryId,
                    }: z.infer<typeof formSchema>) {
    mutate(
      {
        resource: "posts",
        values: {
          postTitle,
          postDescription,
          postMainImage,
          categoryId,
          Tags: postTags,
          postContent: editor?.storage.markdown.getMarkdown(),
        },
      },
      {
        onSuccess: async (data) => {
          await router.push("/dashboard/posts")
        },
      }
    )
  }

  return (
    <div className={"flex gap-16"}>
      <Card className={"h-fit"}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create a new post</CardTitle>
          <CardDescription>
            Enter details below for the post you needs to create
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className={"grid grid-cols-1 gap-x-12 gap-y-4"}>
                <FormField
                  control={form.control}
                  name="postTitle"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: How to create an awesome blog"
                          onKeyUp={(e: any) => {
                            setTitle(e.target.value)
                          }}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category"/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryList.map((value) => (
                            <SelectItem value={value.id} key={value.id}>
                              {value.categoryName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postMainImage"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Post Image Url</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex: https://google.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <div className={"flex items-center gap-2"}>
                  <div className={"flex-1"}>
                    <FormField
                      control={form.control}
                      name="Tags"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>Post Tags</FormLabel>
                          <FormControl>
                            <Input placeholder="ex: NextJs" {...field} />
                          </FormControl>
                          <div>
                            {postTags.length === 0 ? (
                              <p className={"text-sm"}>
                                Please Select a least one
                              </p>
                            ) : (
                              postTags.map((value) => (
                                <Badge key={value}>
                                  {value}
                                  <XOctagon
                                    onClick={() => {
                                      setPostTags([
                                        ...postTags.filter(
                                          (value1) => value1 != value
                                        ),
                                      ])
                                    }}
                                    className={"ml-2 cursor-pointer"}
                                  />
                                </Badge>
                              ))
                            )}
                          </div>
                          <FormMessage/>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button
                    type={"button"}
                    onClick={() => {
                      if (!form.getFieldState("Tags").invalid) {
                        if (
                          postTags.filter(
                            (itemvalue) =>
                              itemvalue.toLowerCase() ==
                              form.getValues("Tags")?.toLowerCase()
                          ).length === 0
                        )
                          setPostTags([
                            ...postTags,
                            `${form.getValues("Tags")?.toString()}`,
                          ])
                      }
                    }}
                  >
                    Add
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="postDescription"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Post Description</FormLabel>
                      <FormControl>
                        <Textarea
                          onKeyUp={(event: any) => {
                            setDescription(event.target.value)
                          }}
                          placeholder="Write a description"
                          {...field}
                        />
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
      <div className={"h-fit flex-1"}>
        <div className="space-y-2">
          <h1 className={cn("scroll-m-20 text-4xl font-bold tracking-tight")}>
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">
            <Balancer>{description}</Balancer>
          </p>
        </div>
        <Separator className="my-4 md:my-6"/>
        <Tiptap editor={editor}/>
      </div>
    </div>
  )
}

export default CreatePostForm
