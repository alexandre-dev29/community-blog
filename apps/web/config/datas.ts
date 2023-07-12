import {FileText, LayoutDashboard, List, User, Users} from "lucide-react"

import {sideBarItem} from "@/types/uiTypes"

export const firstMenuList: sideBarItem[] = [
  {
    IconElement: LayoutDashboard,
    text: "Dashboard",
    link: "/dashboard",
  },
  {
    IconElement: Users,
    text: "Users",
    link: "/dashboard/users",
  },
  {IconElement: FileText, text: "Posts", link: "/dashboard/posts"},
  {
    IconElement: List,
    text: "Categories",
    link: "/dashboard/categories",
  },
  {IconElement: User, text: "Profile", link: "/dashboard/profile"},
]
