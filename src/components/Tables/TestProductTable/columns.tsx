"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"
import Image from "next/image"

export type Column = {
  id: string;
  defaultImage: string;
  title: string;
  slogan: string;
  description: string;
  imageId: string;
  category: string;
  category_type: string;
  city: string | null;
  address: string | null;
  tags: string[];
  rating: number | null;
  contact: number | null;
  price: number | null;
  isFeatured: boolean;
  isActivated: boolean;
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: "defaultImage",
    header: "Image",
    cell: ({ row }) => (
      <div className="rounded-full h-8 w-8 overflow-hidden">
        <Image width={32} height={32} src={row.original.defaultImage} alt="User Image" className="w-full h-auto" />
      </div>
    )
  },
  { accessorKey: "id", header: "ID" },
  { accessorKey: "imageId", header: "Image ID" },
  { accessorKey: "title", header: "Title" },
  { accessorKey: "slogan", header: "Slogan" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "category_type", header: "Category_type" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "tags", header: "Tags" },
  { accessorKey: "rating", header: "Rating" },
  { accessorKey: "contact", header: "Contact" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "isFeatured", header: "IsFeatured" },
  { accessorKey: "isActivated", header: "IsActivated" },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },

]
