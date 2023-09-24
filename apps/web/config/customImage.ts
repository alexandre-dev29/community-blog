import { Node, nodeInputRule } from "@tiptap/core"

import { UploadFn, dropImagePlugin } from "./dropImage"

/**
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */
const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/

export const createImageExtension = (uploadFn: UploadFn) => {
  return Node.create({
    name: "image",
    inline: true,
    group: "inline",
    draggable: true,
    addAttributes: () => ({
      src: {},
      alt: { default: null },
      title: { default: null },
    }),
    parseHTML: () => [
      {
        tag: "img[src]",
        getAttrs: (dom) => {
          if (typeof dom === "string") return {}
          const element = dom as HTMLImageElement

          return {
            src: element.getAttribute("src"),
            title: element.getAttribute("title"),
            alt: element.getAttribute("alt"),
          }
        },
      },
    ],
    renderHTML: ({ HTMLAttributes }) => ["img", HTMLAttributes],

    // @ts-ignore
    addCommands() {
      return (attrs: any) => (state: any, dispatch: any) => {
        const { selection } = state
        const position = selection.$cursor
          ? selection.$cursor.pos
          : selection.$to.pos
        const node = this.type.create(attrs)
        const transaction = state.tr.insert(position, node)
        dispatch(transaction)
      }
    },
    addInputRules() {
      return [
        nodeInputRule({
          find: IMAGE_INPUT_REGEX,
          type: this.type,
          getAttributes: (match) => {
            const [, alt, src, title] = match
            return { src, title, alt }
          },
        }),
      ]
    },
    addProseMirrorPlugins() {
      return [dropImagePlugin(uploadFn)]
    },
  })
}
