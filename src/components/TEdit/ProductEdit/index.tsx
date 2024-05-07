"use client"

import * as z from "zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { TestProduct } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { useDropzone } from 'react-dropzone';

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import ImageUpload from "@/components/ui/image-upload"

const formSchema = z.object({
  title: z.string().min(1),
  defaultImage: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  rating: z.coerce.number().min(1),
  contact: z.coerce.number().min(1),
  imageId: z.string().min(1),
  slogan: z.string().min(1),
  category: z.string().min(1),
  category_type: z.string().min(1),
  city: z.string().min(1),
  address: z.string().min(1),
  tags: z.object({ url: z.string() }).array(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  data: TestProduct | null;
};

interface Product {
  id: string;
  title: string;
}

export const ProductEdit: React.FC<ProductFormProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  const [dataDownload, setDataDownload] = useState("");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = data ? 'Edit product' : 'Create product';
  const descriptions = data ? 'Edit a product.' : 'Add a new product';
  const toastMessage = data ? 'Product updated.' : 'Product created.';
  const action = data ? 'Save changes' : 'Create';

  const defaultFormData: ProductFormValues = {
    defaultImage: data?.defaultImage || '',
    images: data?.images.map(url => ({ url })) || [],
    imageId: data?.imageId || '',
    title: data?.title || '',
    slogan: data?.slogan || '',
    category: data?.category || '',
    category_type: data?.category_type || '',
    city: data?.city || '',
    address: data?.address || '',
    tags: data?.tags.map(url => ({ url })) || [],
    rating: data?.rating ?? 0,
    contact: data?.contact ?? 0, // Provide a default value of 0 if contact is null
    price: data?.price ?? 0,
    isFeatured: data?.isFeatured || false,
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data ? defaultFormData : {
      defaultImage: '',
      images: [],
      imageId: "",
      title: '',
      slogan: '',
      category: '',
      category_type: '',
      city: '',
      address: '',
      tags: [],
      rating: 0,
      contact: 0,
      price: 0,
      isFeatured: false,
      isArchived: false,
    }
  });

  const ImageUploadField = ({ field, loading }: { field: any; loading: boolean }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => field.onChange(acceptedFiles),
    });

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag `&apos;`n`&apos;` drop some files here, or click to select files</p>
        {field.value.map((file: any) => (
          <div key={file.name}>
            {file.name} - {file.size} bytes
          </div>
        ))}
      </div>
    );
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (data) {
        await axios.patch(`/${process.env.NEXT_PUBLIC_API_URL}/${params.storeId}/products/${params.productId}`, data);
      } else {
        await axios.post(`/${process.env.NEXT_PUBLIC_API_URL}/${params.storeId}/products`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/products`);

      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/${process.env.NEXT_PUBLIC_API_URL}/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success('Product deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all categories using this product first.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  // return (
  //   <>

  //     <div className="flex items-center justify-between mt-10">
  //       <Heading title={title} description={descriptions} />
  //       {data && (
  //         <Button
  //           disabled={loading}
  //           variant="destructive"
  //           size="sm"
  //           onClick={() => setOpen(true)}
  //         >
  //           <Trash className="h-4 w-4" />
  //         </Button>
  //       )}
  //     </div>

  //     <Separator />

  //     <Form {...form}>
  //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">

  //       <FormField
  //           control={form.control}
  //           name="images"
  //           render={({ field }) => (
  //             <FormItem>
  //               <FormLabel>Images</FormLabel>
  //               <FormControl>
  //                 <ImageUpload
  //                   value={field.value.map((image) => image.url)}
  //                   disabled={loading}
  //                   onChange={(url) => field.onChange([...field.value, { url }])}
  //                   onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
  //                 />
  //               </FormControl>
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />

  //         <div className="md:grid md:grid-cols-3 gap-8">
  //           <FormField
  //             control={form.control}
  //             name="title"
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Name</FormLabel>
  //                 <FormControl>
  //                   <Input disabled={loading} placeholder="Products name" {...field} />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="slogan"
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Description</FormLabel>
  //                 <FormControl>
  //                   <Input disabled={loading} placeholder="Products description" {...field} />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="price"
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Price</FormLabel>
  //                 <FormControl>
  //                   <Input type="number" disabled={loading} placeholder="9.99" {...field} />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="category"
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Category Navbar</FormLabel>
  //                 <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
  //                   <FormControl>
  //                     <SelectTrigger>
  //                       <SelectValue defaultValue={field.value} placeholder="Select a category">

  //                       </SelectValue>
  //                     </SelectTrigger>
  //                   </FormControl>
  //                   {/* <SelectContent>
  //                     {categories.map((category) => (
  //                       <SelectItem key={category.id} value={category.uuid}>
  //                         {category.name}
  //                       </SelectItem>
  //                     ))}
  //                   </SelectContent> */}
  //                 </Select>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="category_type"
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Color</FormLabel>
  //                 <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
  //                   <FormControl>
  //                     <SelectTrigger>
  //                       <SelectValue defaultValue={field.value} placeholder="Select a color">

  //                       </SelectValue>
  //                     </SelectTrigger>
  //                   </FormControl>
  //                   {/* <SelectContent>
  //                     {colors.map((data) => (
  //                       <SelectItem key={data.id} value={data.uuid}>
  //                         {data.name}
  //                       </SelectItem>
  //                     ))}
  //                   </SelectContent> */}
  //                 </Select>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="imageId"
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Size</FormLabel>
  //                 {/* <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
  //                   <FormControl>
  //                     <SelectTrigger>
  //                       <SelectValue defaultValue={field.value} placeholder="Select a size">

  //                       </SelectValue>
  //                     </SelectTrigger>
  //                   </FormControl>
  //                   <SelectContent>
  //                     {sizes.map((data) => (
  //                       <SelectItem key={data.id} value={data.uuid} style={{ backgroundColor: data.value }}>
  //                         {data.name}
  //                       </SelectItem>
  //                     ))}
  //                   </SelectContent>
  //                 </Select> */}
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="tags"
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Size</FormLabel>
  //                 {/* <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
  //                   <FormControl>
  //                     <SelectTrigger>
  //                       <SelectValue defaultValue={field.value} placeholder="Select a size">

  //                       </SelectValue>
  //                     </SelectTrigger>
  //                   </FormControl>
  //                   <SelectContent>
  //                     {tags.map((data) => (
  //                       <SelectItem key={data.id} value={data.uuid} style={{ backgroundColor: data.value }}>
  //                         {data.name}
  //                       </SelectItem>
  //                     ))}
  //                   </SelectContent>
  //                 </Select> */}
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="isFeatured"
  //             render={({ field }) => (
  //               <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
  //                 <FormControl>
  //                   <Checkbox
  //                     checked={field.value}
  //                     onCheckedChange={field.onChange}
  //                   />
  //                 </FormControl>
  //                 <div className="sapce-y-1 leading-none">
  //                   <FormLabel>Featured</FormLabel>
  //                   <FormDescription>
  //                     This product will appear on the home page.
  //                   </FormDescription>
  //                 </div>
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="isArchived"
  //             render={({ field }) => (
  //               <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
  //                 <FormControl>
  //                   <Checkbox
  //                     checked={field.value}
  //                     // @ts-ignore
  //                     onCheckedChange={field.onChange}
  //                   />
  //                 </FormControl>
  //                 <div className="sapce-y-1 leading-none">
  //                   <FormLabel>Archived</FormLabel>
  //                   <FormDescription>
  //                     This product will not appear on the store.
  //                   </FormDescription>
  //                 </div>
  //               </FormItem>
  //             )}
  //           />
  //         </div>
  //         <Button disabled={loading} className="ml-auto" type="submit">
  //           {action}
  //         </Button>
  //       </form>
  //     </Form>

  //   </>
  // );

  // fetch('http://localhost:3000/api/get/products')
  // .then(response => {
  //   // Check if the response is successful (status code 200)
  //   if (response.ok) {
  //     // Parse the JSON response
  //     return response.json();
  //   }
  //   // If response is not successful, throw an error
  //   throw new Error('Network response was not ok.');
  // })
  // .then(data => {
  //   // Process the fetched data
  //   setDataDownload(data);
  //   console.log(dataDownload)
  // })
  // .catch(error => {
  //   // Handle any errors that occurred during the fetch
  //   console.error('Fetch error:', error);
  // });

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get/products');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = () => {
    // Handle delete logic here
  };

  const handleSelect = (id: string) => {
    setSelectedProduct(id);
    console.log(selectedProduct)
  }

  return (
    <div>
      <div className="flex items-center justify-between mt-10">
        <Heading title={title} description={descriptions} />
        {selectedProduct && (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <div className="flex justify-between mt-4 mb-4">
        {/* <Select>
          <SelectTrigger className="w-[180px] bg-slate-900 text-slate-300">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {products.map(product => (
              <SelectItem key={product.id} value={product.id}>
                {product.title}
              </SelectItem>

            ))}
          </SelectContent>
        </Select> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Navbar</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-[180px] bg-slate-900 text-slate-300">
                        <SelectValue defaultValue={field.value} placeholder="Select a category">

                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Heading title={selectedProduct ? products.find(product => product.id === selectedProduct)?.title || "" : "Select Product"} description={descriptions} />
      </div>

      <Separator />

    </div>
  );
};

export default ProductEdit;