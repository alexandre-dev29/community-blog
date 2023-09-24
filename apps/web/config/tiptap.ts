import { EditorOptions } from "@tiptap/core"
import { Link } from "@tiptap/extension-link"
import { Placeholder } from "@tiptap/extension-placeholder"
import Typography from "@tiptap/extension-typography"
import Youtube from "@tiptap/extension-youtube"
import StarterKit from "@tiptap/starter-kit"
import { CodeBlockPrism } from "tiptap-extension-code-block-prism"
import { Markdown } from "tiptap-markdown"

import { createImageExtension } from "@/config/customImage"
import { cloudinaryUploadImage } from "@/lib/utils"
import Iframe from "@/components/tiptap/Iframe"

export const tipTapEditorConfig = (content: string): Partial<EditorOptions> => {
  return {
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          return "Write some content"
        },
      }),
      Typography,
      Markdown,
      CodeBlockPrism.configure({ defaultLanguage: "text" }),
      createImageExtension(cloudinaryUploadImage),
      Youtube.configure({
        controls: true,
      }),
      Iframe,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    editorProps: {},
  }
}
