"use client"

import {CodeBlockLowlight} from "@tiptap/extension-code-block-lowlight"
import Image from "@tiptap/extension-image"
import {Link} from "@tiptap/extension-link"
import {Placeholder} from "@tiptap/extension-placeholder"
import Typography from "@tiptap/extension-typography"
import Youtube from "@tiptap/extension-youtube"
import {Editor, EditorContent, useEditor} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {lowlight} from "lowlight/lib/core"

import BubbleMenuTipTap from "@/components/tiptap/BubbleMenuTipTap"
import FloatingButtonTipTap from "@/components/tiptap/FloatingButtonTipTap"

const Tiptap = ({editor}: { editor: Editor | null }) => {
  return (
    <>
      <FloatingButtonTipTap editor={editor}/>
      <BubbleMenuTipTap editor={editor}/>
      <EditorContent editor={editor}/>
    </>
  )
}

export default Tiptap
