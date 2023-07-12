import React from "react"
import {Users} from "lucide-react"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"

const InfoCard = ({
                    subTitle,
                    title,
                    value,
                  }: {
  title: string
  value: string
  subTitle: string
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground"/>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{subTitle}</p>
      </CardContent>
    </Card>
  )
}

export default InfoCard
