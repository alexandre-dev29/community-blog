import {serialize} from "next-mdx-remote/serialize"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCodeTitles from "rehype-code-titles"
import rehypePrettyCode from "rehype-pretty-code"
import rehypePrism from "rehype-prism-plus"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

import {moonlight} from "@/lib/moonlight"

const GenerateMdxSource = async (
  content: string,
  data: { [p: string]: any }
) => {
  const options: import("rehype-pretty-code").Options = {
    theme: JSON.parse(JSON.stringify(moonlight)),
  }
  return await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [rehypePrettyCode, options],
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["wrap"],
            },
          },
        ],
        require("rehype-accessible-emojis").rehypeAccessibleEmojis,
      ],
      format: "mdx",
    },
    scope: data,
  })
}

export default GenerateMdxSource
