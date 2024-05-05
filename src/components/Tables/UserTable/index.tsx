import { prisma } from "@/utils/prismaDB";
import { Column, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table2"

async function getData(): Promise<Column[]> {
  // Fetch data from your API here.
  var data = prisma.user.findMany();

  return data;
}


export default async function TestTable() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable searchKey="name" searchKey2="email" columns={columns} data={data} />
    </div>
  )
}
