
import { Tabs as TabsComponent, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataTable from '@/components/Tables/UserTable';

export function Tabs() {
  return (
    <TabsComponent defaultValue="users" className="item-center justify-center h-full mr-4 ml-4 mt-4">
      <TabsList>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger value="edit">Edit</TabsTrigger>
        <TabsTrigger value="feature">Featured</TabsTrigger>
        <TabsTrigger value="category">Category</TabsTrigger>
        <TabsTrigger value="categoryType">Category Type</TabsTrigger>
      </TabsList>
      <TabsContent value="users"> <div className="h-ful"> <DataTable /> </div> </TabsContent>

    </TabsComponent>

  )
}
