import "@/styles/globals.css"
import {Metadata} from "next"
import {cookies} from "next/headers"

import RefineConfig from "@/config/refine-config"
import {siteConfig} from "@/config/site"
import {getAllCategories, getAllPostsForSearch} from "@/lib/api-calls"
import {fontSans} from "@/lib/fonts"
import {cn} from "@/lib/utils"
import {Toaster} from "@/components/ui/toaster"
import {CommandRender} from "@/components/command/command-render"
import {TailwindIndicator} from "@/components/tailwind-indicator"
import {ThemeProvider} from "@/components/theme-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    {media: "(prefers-color-scheme: light)", color: "white"},
    {media: "(prefers-color-scheme: dark)", color: "black"},
  ],
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_FRONT_URL}`),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  keywords: siteConfig.keyWords,
  authors: siteConfig.authors,
  viewport: {
    minimumScale: 1,
    width: "device-width",
    initialScale: 1,
    maximumScale: 6,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({children}: RootLayoutProps) {
  const [post, listOfCategories] = await Promise.all([
    getAllPostsForSearch(cookies().toString()),
    getAllCategories(cookies().toString()),
  ])
  return (
    <>
      <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
      <RefineConfig>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <TailwindIndicator/>
          <CommandRender categories={listOfCategories} posts={post}/>
          <Toaster/>
        </ThemeProvider>
      </RefineConfig>
      </body>
      </html>
    </>
  )
}
