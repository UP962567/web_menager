"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type Column = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "group",
    header: "Group",
  },
  {
    accessorKey: "clients",
    header: "People +8",
  },
  {
    accessorKey: "discount",
    header: "Discount/Pay",
  },
  {
    accessorKey: "addonId",
    header: "Packet",
  },
  {
    accessorKey: "start_time",
    header: "CheckIn",
  },
  {
    accessorKey: "end_time",
    header: "CheckOut",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },

]
