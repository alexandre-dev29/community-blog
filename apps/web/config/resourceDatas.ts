import {ResourceProps} from "@refinedev/core";

export const resourceDatas: ResourceProps[] | undefined = [
  {
    name: "users",
    list: "/dashboard/users",
    create: "/dashboard/users/create",
    edit: "/dashboard/users/edit/:id",
    show: "/dashboard/users/show/:id",
  },
  {
    name: "categories",
    list: "/dashboard/categories",
    create: "/dashboard/categories/create",
    edit: "/dashboard/categories/edit/:id",
    show: "/dashboard/categories/show/:id",
  },
  {
    name: "posts",
    list: "/dashboard/posts",
    create: "/dashboard/posts/create",
    edit: "/dashboard/posts/edit/:id",
    show: "/dashboard/posts/show/:id",
  },
  {
    name: "profile",
    list: "/dashboard/profile",
  },
];
