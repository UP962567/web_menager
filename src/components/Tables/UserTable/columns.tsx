"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"

export type Column = {
  image: string
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  password: string | null
  passwordResetToken: string | null
  passwordResetTokenExp: Date | null
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="rounded-full h-8 w-8 overflow-hidden">
        <Image width={32} height={32} src={row.original.image} alt="User Image" className="w-full h-auto" />
      </div>
    )
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "emailVerified",
    header: "EmailVerified",
  },
  {
    accessorKey: "passwordResetToken",
    header: "Reset Token",
  },
  {
    accessorKey: "passwordResetTokenExp",
    header: "Reset Token Exp",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },

]
