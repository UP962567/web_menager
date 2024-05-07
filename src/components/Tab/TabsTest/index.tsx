import { Tabs as TabsComponent, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DataTable from '@/components/Tables/TestProductTable';
import TestProduct from "@/components/TCreate/TestProduct";
import ProductEdit from "@/components/TEdit/ProductEdit";
import { prisma } from "@/utils/prismaDB";

export async function Tabs() {
  // Fetch data from the database
  // Fetch data from the database
  const data = await prisma.testProduct.findMany();

  // Define the interface for the product object
  interface Product {
    id: string;
    defaultImage: string;
    images: string[];
    imageId: string;
    title: string;
    slogan: string;
    description: string;
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

  // Ensure that data is not empty before rendering
  if (data.length === 0) {
    return null; // Or render a loading indicator
  }

  const firstProduct = data[0];


  // Define the interface for the props passed to ProductEdit
  interface ProductEditProps {
    data: Product | null; // Update to expect a single product or null
  }

  return (
    <TabsComponent defaultValue="main" className="item-center justify-center h-full mr-4 ml-4 mt-4">
      <TabsList>
        <TabsTrigger value="main">Main</TabsTrigger>
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger value="edit">Edit</TabsTrigger>
      </TabsList>
      <TabsContent value="main"> <div className="h-ful"> <DataTable /> </div> </TabsContent>
      <TabsContent value="create"> <div className="h-ful"> <TestProduct /> </div> </TabsContent>
      <TabsContent value="edit">
        <div className="h-ful">
          <ProductEdit data={firstProduct} />
        </div>
      </TabsContent>
    </TabsComponent>
  );
}
