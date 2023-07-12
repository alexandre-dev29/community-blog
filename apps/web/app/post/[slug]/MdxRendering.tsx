"use client"

import React from "react"
import {MDXRemote, MDXRemoteSerializeResult} from "next-mdx-remote"

import useReadingProgress from "@/hooks/use-reading-progress"
import MdxComponents from "@/components/mdx-components"

const MdxRendering = ({
                        mdxSource,
                      }: {
  mdxSource: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >
}) => {
  return <MDXRemote {...mdxSource} components={MdxComponents}/>
}

export default MdxRendering
