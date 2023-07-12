import React from "react"
import {cookies} from "next/headers"
import {redirect} from "next/navigation"

import {fontSans} from "@/lib/fonts"
import {checkUserConnection} from "@/lib/utils"
import NavBar from "@/components/layout/DashNavBar"
import SideBar from "@/components/layout/DashSideBar"

const DashboardLayout = ({children}: { children: React.ReactNode }) => {
  const {authenticated, redirectTo} = checkUserConnection(cookies().getAll())
  if (!authenticated) {
    redirect(`${redirectTo}`)
  }
  const sideBardWidth = 60
  const navBarHeight = 8
  return (
    <div
      className={fontSans.className}
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <div className={"flex flex-col"}>
        <NavBar sidebarWidth={sideBardWidth} navBarHeight={navBarHeight}/>

        <div className={"flex w-full justify-center"}>
          <SideBar sidebarWidth={sideBardWidth} navBarHeight={navBarHeight}/>
          <main
            className={"h-full w-[96vw] bg-background"}
            style={{height: `${100 - navBarHeight}vh`}}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
export default DashboardLayout
