"use client"

import * as React from "react"
import {useState} from "react"
import Link from "next/link"
import {CanAccess} from "@refinedev/core"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {IPost} from "@/types/posts"
import {Posts} from "@/config/postDataTable"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useToast} from "@/components/ui/use-toast"
import {DataTableViewOptions} from "@/components/table/data-table-column-toggle"
import {DataTablePagination} from "@/components/table/data-table-pagination"
import {columns} from "@/app/dashboard/posts/column"

interface DataTableProps<TData, TValue> {
  data: TData[]
}

export function DataTable<TData, TValue>({
                                           data,
                                         }: DataTableProps<TData, TValue>) {
  const {toast} = useToast()

  const [currentData, setCurrentData] = useState(data as Posts[])

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data: currentData,
    columns: columns(setCurrentData, currentData, toast),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })
  const getActualSizeOfColumn = (columnName: string) => {
    switch (columnName) {
      case "postDescription":
        return "w-[40%]"
      case "postSlug":
        return "w-[250px]"
      case "status":
      case "categoryName":
      case "viewCount":
        return "w-[100px]"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className={"flex justify-between"}>
          <h1
            className={
              "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl"
            }
          >
            Post list
          </h1>
          <Link href={"/dashboard/posts/create"}>
            <Button>Create post</Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter title..."
              value={
                (table.getColumn("postTitle")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("postTitle")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DataTableViewOptions table={table}/>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className={`${getActualSizeOfColumn(header.id)}`}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={table}/>
        </div>
      </CardContent>
    </Card>
  )
}
