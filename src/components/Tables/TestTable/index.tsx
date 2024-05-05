import { Column, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table2"

async function getData(): Promise<Column[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}


export default async function TestTable() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable searchKey="status" searchKey2="email" columns={columns} data={data} />
    </div>
  )
}
