import React from "react"

import {SiteHeader} from "@/components/site-header"

export default function CategoryLayout({
                                         children,
                                       }: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader/>
      <div className="flex-1">{children}</div>
    </div>
  )
}
