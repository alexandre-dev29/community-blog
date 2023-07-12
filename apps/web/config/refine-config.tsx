"use client"

import React from "react"
import {NotificationProvider, Refine} from "@refinedev/core"
import routerProvider from "@refinedev/nextjs-router/app"

import {API_URL} from "@/config/constants"
import {accessControlProvider} from "@/lib/refine/accessControlProvider"
import {authProvider} from "@/lib/refine/authProvider"
import {dataProvider} from "@/lib/refine/dataProvider"
import {useToast} from "@/components/ui/use-toast"

import {resourceDatas} from "./resourceDatas"

export interface RefineConfigProps {
  children: React.ReactNode
}

export function RefineConfig({children}: RefineConfigProps) {
  const {toast} = useToast()

  const notificationProvider: NotificationProvider = {
    open: ({message, type, key, description}) => {
      if (type === "error") {
        toast({
          description: message,
          key,
          title: description,
          variant: "destructive",
        })
      } else {
        toast({
          description: message,
          key,
          title: description,
        })
      }
    },
    close: () => {
    },
  }
  return (
    <div>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        accessControlProvider={accessControlProvider}
        resources={resourceDatas}
        authProvider={authProvider}
        notificationProvider={notificationProvider}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
        }}
      >
        {children}
      </Refine>
    </div>
  )
}

export default RefineConfig
