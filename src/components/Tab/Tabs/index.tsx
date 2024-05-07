
import { Tabs as TabsComponent, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataTable from '@/components/Tables/TestTable';

export function Tabs() {
  return (
    <TabsComponent defaultValue="main" className="item-center justify-center h-full mr-4 ml-4 mt-4">
      <TabsList>
        <TabsTrigger value="main">Main</TabsTrigger>
        <TabsTrigger value="tags">Tags</TabsTrigger>
        <TabsTrigger value="category">Category</TabsTrigger>
        <TabsTrigger value="types">Types</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="city">City</TabsTrigger>
        <TabsTrigger value="restaurants">Restaurants</TabsTrigger>

      </TabsList>
      <TabsContent value="account">Make changes to your account here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
      <TabsContent value="main">
        <div className="container">
          <DataTable />

        </div>
      </TabsContent>
    </TabsComponent>

  )
}
