"use client"

import * as React from "react"
import Link from "next/link"
import {Boxes, Newspaper} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

type ResponseModel = {
  title: string
  slug: string
}

export function CommandRender({
                                posts,
                                categories,
                              }: {
  categories: ResponseModel[]
  posts: ResponseModel[]
}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "b" && e.ctrlKey) {
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..."/>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Categories">
          {categories.map((value, index) => (
            <Link href={`/category/${value.slug}`} key={value.slug}>
              <CommandItem className={"cursor-pointer"}>
                <Boxes className="mr-2 h-4 w-4"/>
                <span>{value.title}</span>
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
        <CommandSeparator/>
        <CommandGroup heading="Posts">
          {posts.map((value) => (
            <Link href={`/post/${value.slug}`} key={value.slug}>
              <CommandItem className={"cursor-pointer"}>
                <Newspaper className="mr-2 h-4 w-4"/>
                <span>{value.title}</span>
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
