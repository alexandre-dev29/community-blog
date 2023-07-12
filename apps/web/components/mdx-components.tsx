"use client"

import * as React from "react"
import Image from "next/image"
import Balancer from "react-wrap-balancer"

import {cn} from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {AspectRatio} from "@/components/ui/aspect-ratio"
import {Callout} from "@/components/callout"
import {CodeBlockWrapper} from "@/components/code-block-wrapper"
import {ComponentSource} from "@/components/component-source"
import {CopyButton} from "@/components/copy-code"
import BlurImage from "@/components/images/blur-image"

export const PreElement = ({children, raw, ...props}: any) => {
  const lang = props["data-language"]
  return (
    <pre {...props} className={"p-0"}>
      <div
        className={
          "flex justify-between border-b-2 border-muted-foreground px-6  py-2"
        }
      >
        <p className={"uppercase"} style={{color: "rgb(255, 117, 127)"}}>
          {lang}
        </p>
        <CopyButton text={raw}/>{" "}
      </div>
      {children}
    </pre>
  )
}

const mdxComponents = {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertTitle,
  AlertDescription,

  h1: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-20 text-4xl font-bold",
        className
      )}
      {...props}
    />
  ),
  pre: PreElement,
  h2: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),

  h6: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({className, ...props}: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  figure: ({className, ...props}: React.HTMLAttributes<HTMLElement>) => (
    <a className={cn("my-4", className)} {...props} />
  ),

  p: ({className, ...props}: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "text-lg leading-7 text-muted-foreground [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  ),
  ul: ({className, ...props}: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({className, ...props}: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({className, ...props}: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({className, ...props}: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({
          className,
          alt,
          ...props
        }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <BlurImage src={`${props.src}`} props={props}/>
  ),
  hr: ({...props}: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({className, ...props}: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({className, ...props}: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({className, ...props}: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({className, ...props}: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  ComponentSource,
  AspectRatio,
  CodeBlockWrapper: ({...props}) => (
    <CodeBlockWrapper className="rounded-md border" {...props} />
  ),
  Steps: ({...props}) => (
    <div
      className="[&>h3]:step mb-12 ml-4 border-l pl-8 [counter-reset:step]"
      {...props}
    />
  ),
}
export default mdxComponents
