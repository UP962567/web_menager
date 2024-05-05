
import { Tabs as TabsComponent, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataTable from '@/components/Tables/TestProductTable';
import { Button } from "@/components/ui/button";
import { TestProduct } from "@/components/TCreate/TestProduct";

export function Tabs() {
  return (
    <TabsComponent defaultValue="main" className="item-center justify-center h-full mr-4 ml-4 mt-4">
      <TabsList>
        <TabsTrigger value="main">Main</TabsTrigger>
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger value="category">Category</TabsTrigger>
        <TabsTrigger value="types">Types</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="city">City</TabsTrigger>
        <TabsTrigger value="restaurants">Restaurants</TabsTrigger>

      </TabsList>
      <TabsContent value="main"> <div className="h-ful"> <DataTable /> </div> </TabsContent>
      <TabsContent value="create"> <div className="h-ful"> <TestProduct /> </div> </TabsContent>
    </TabsComponent>

  )
}
