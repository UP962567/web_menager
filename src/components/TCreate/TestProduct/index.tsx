"use client"
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const TestProduct = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [isArchive, setIsArchive] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [defaultImage, setDefaultImage] = useState('');
  const [imageId, setImageId] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };
  const handleTagInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTagInput(value);
  };
  const handleIsFeaturedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFeatured(event.target.checked);
  };
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  const handleCategorySubChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(event.target.value);
  };
  const handleIsArchiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsArchive(event.target.checked);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ' ' || event.key === '/') {
      event.preventDefault();
      addTag(tagInput.trim());
    }
  };
  const addTag = (tag: string) => {
    if (tag) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
    const timestamp = Date.now();
    const randomString = `${randomNum}${timestamp}`;
    setImageId(randomString);

    if (!imageId) {
      const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
      const timestamp = Date.now();
      const randomString = `${randomNum}${timestamp}`;
      setImageId(randomString);
    }

    // Upload the default image
    try {
      if (!selectedFile) {
        toast.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('title', imageId); // Add the title to the FormData object

      const response = await fetch('https://storage.ma-dy.com/img/TestingUpload/upload.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      setDefaultImage("https://storage.ma-dy.com/img/TestingUpload/" + data.file_path);
    } catch (error) {
      console.error('Error uploading file', error);
    }

    // Upload the rest of the images
    try {
      if (!selectedFiles || selectedFiles.length === 0) {
        toast.error('No files selected');
        return;
      }

      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('files[]', file); // Use 'files[]' to indicate an array of files
      });
      formData.append('title', imageId); // Add the title to the FormData object

      const response = await fetch('https://storage.ma-dy.com/img/TestingUpload/uploadPlus.php', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const responseData = await response.json();
      const file_paths: string[] = responseData.file_paths;
  
      // Prepend the base URL to each file path
      const fullFilePaths: string[] = file_paths.map(filePath => "https://storage.ma-dy.com/img/TestingUpload/" + filePath);
      setImages(fullFilePaths)
  
  } catch (error) {
    console.error('Error uploading files', error);
    toast.error('Error uploading files');
  }

  const value = Object.fromEntries(data.entries());
  const finalData = { ...value, tags, defaultImage, imageId, images};

  setLoading(true);
  fetch("/api/productTest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(finalData),
  })
    .then((res) => res.json())
    .then((data) => {
      toast.success("Successfully registered");
      setLoading(false);
      router.refresh();
    })
    .catch((err) => {
      toast.error(err.message);
      setLoading(false);
    });
};

return (

  <div className="max-w-4xl mx-auto">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit} >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          name="title"
          placeholder="Product Title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Slogan
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="slogan"
          type="slogan"
          name="slogan"
          placeholder="Slogan Title"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          placeholder="Product Description"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          City
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          name="city"
          placeholder="City Name: Elbasan"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          name="address"
          placeholder="Address: Rruga e Kavajes"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Contact
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          name="contact"
          placeholder="Contact Number: +355 123 456 789"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Category
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="category"
          name="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Type
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="category_type"
          name="category_type"
          value={selectedSubCategory}
          onChange={handleCategorySubChange}
        >
          <option value="house">House</option>
          <option value="hotel">Hotel</option>
          <option value="apartment">Apartment</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          name="price"
          type="number"
          placeholder="Product Price"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Rating
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="rating"
          name="rating"
          type="rating"
          placeholder="Product Rating"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Image
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="image"
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Select Image
        </label>
        {selectedFile && <p className="text-gray-700 mt-2">{selectedFile.name}</p>}
      </div>


      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
          Images
        </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleFilesChange}
          className="hidden"
        />
        <label
          htmlFor="images"
          className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Select Images
        </label>
        {selectedFiles.map((file, index) => (
          <p key={index} className="text-gray-700 mt-2">{file.name}</p>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
          Tags
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={tagInput}
          onChange={handleTagInput}
          onKeyDown={handleKeyDown}
          placeholder="Add tags (press space or / to add)"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div className="mt-2">
          {tags.map((tag, index) => (
            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isFeatured">
          Is Featured
        </label>
        <input
          type="checkbox"
          id="isFeatured"
          name="isFeatured"
          checked={isFeatured}
          onChange={handleIsFeaturedChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isArchive">
          Is Active
        </label>
        <input
          type="checkbox"
          id="isArchive"
          name="isActivated"
          checked={isArchive}
          onChange={handleIsArchiveChange}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
      </div>

      <hr className="mb-6" />

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="submit"
        >
          Add Product
        </button>
      </div>
    </form>
  </div>

)
}

export default TestProduct;
