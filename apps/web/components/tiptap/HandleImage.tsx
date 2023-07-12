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
    imageUrl: z.string().url({
      message: "Please write a correct url.",
    }),
    altText: z
      .string()
      .min(5, {message: "the alt text must have at least 5 letter"}),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      altText: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editor) {
      editor.commands.insertContent(
        `<img src="${values.imageUrl}" alt="${values.altText}" />`
      )
      setIsOpen(false)
      form.reset({imageUrl: "", altText: ""})
    }
  }

  return (
    <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 space-y-8"
        >
          <div className={"flex gap-4"}>
            <FormField
              control={form.control}
              name="imageUrl"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: https://google.com" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="altText"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Alt text</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: image animal" {...field} />
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
