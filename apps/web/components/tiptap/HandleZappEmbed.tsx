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

const HandleZappEmbed = ({
                           editor,
                           setIsOpen,
                           isOpen,
                         }: {
  editor: Editor | null
  isOpen: boolean
  setIsOpen: any
}) => {
  const formSchema = z.object({
    linkUrl: z.string().url({
      message: "Please write a correct url.",
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      linkUrl: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editor) {
      editor
        .chain()
        .focus()
        .setIframe({
          src: values.linkUrl,
        })
        .run()

      setIsOpen(false)
      form.reset({linkUrl: ""})
    }
  }

  return (
    <CustomModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="linkUrl"
            render={({field}) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ex: https://zapp.run/github/Yczar/solar-system"
                    {...field}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
        </form>
      </Form>
    </CustomModal>
  )
}

export default HandleZappEmbed
