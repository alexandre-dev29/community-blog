import React from "react"
import {zodResolver} from "@hookform/resolvers/zod"
import {Editor} from "@tiptap/react"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import CustomModal from "@/components/tiptap/CustomModal"

const HandleImage = ({
                       editor,
                       setIsOpen,
                       isOpen,
                       isEdit,
                     }: {
  editor: Editor | null
  isOpen: boolean
  setIsOpen: any
  isEdit: boolean
}) => {
  const formSchema = z.object({
    youtubeUrl: z.string().url({
      message: "Please write a correct youtube url",
    }),
    width: z.string(),
    height: z.string(),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      youtubeUrl: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editor) {
      editor.commands
        .insertContent(`<div class="youtube_container" data-youtube-video>
        <iframe src="${values.youtubeUrl}" class="youtube_frame" width="${values.width} height=${values.height}"></iframe>
      </div>`)
      setIsOpen(false)
      form.reset({youtubeUrl: ""})
    }
  }

  return (
    <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex min-w-[400px] flex-col space-y-8"
        >
          <FormField
            control={form.control}
            name="youtubeUrl"
            render={({field}) => (
              <FormItem>
                <FormLabel>Youtube Url</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: https://www.youtube.com/watch?v=NmyRnxQP1OQ"
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <div className={"flex gap-6"}>
            <FormField
              control={form.control}
              name="width"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 640" {...field} type={"number"}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 480" {...field} type={"number"}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit">{isEdit ? "Edit" : "Insert"}</Button>
        </form>
      </Form>
    </CustomModal>
  )
}

export default HandleImage
