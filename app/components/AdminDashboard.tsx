"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosConfig";
import AddEditProductForm from "./AddEditProductForm";
import { storage, ID } from "@/lib/appwriteConfig";
import { Product, ProductFormData } from "@/types"; // Define types in a separate file
import Orders from "./Orders"; // Import the updated Orders component

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState<"products" | "orders">(
    "products"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar toggle

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("products/dashboard");
      setProducts(response.data);
    } catch (error) {
      setError("Failed to fetch products. Please try again.");
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch images from Appwrite
  const fetchImages = async () => {
    try {
      const response = await storage.listFiles("678bc73e0009c345b3e6"); // Replace with your Appwrite bucket ID
      const imageUrls = response.files.map(
        (file) =>
          `https://appwrite.clockyeg.com/v1/storage/buckets/678bc73e0009c345b3e6/files/${file.$id}/view?project=678bc6d5000e65b1ae96&mode=admin`
      );
      setImages(imageUrls);
    } catch (error) {
      setError("Failed to fetch images. Please try again.");
      console.error("Failed to fetch images from Appwrite", error);
    }
  };

  // Fetch data based on active section
  useEffect(() => {
    if (activeSection === "products" && isAuthenticated) {
      fetchProducts();
      fetchImages();
    }
  }, [activeSection, isAuthenticated]);

  // Save or update product
  const handleSaveProduct = async (productData: ProductFormData) => {
    setLoading(true);
    setError(null);

    try {
      if (editingProduct) {
        // Update product
        const response = await axiosInstance.put(
          `/products/${editingProduct._id}`,
          productData
        );
        setProducts(
          products.map((product) =>
            product._id === editingProduct._id ? response.data : product
          )
        );
        setEditingProduct(null);
      } else {
        // Add new product
        const response = await axiosInstance.post("/products", productData);
        setProducts([...products, response.data]);
      }
      setShowAddProductForm(false); // Hide form after saving
    } catch (error) {
      setError("Failed to save product. Please try again.");
      console.error("Failed to save product", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axiosInstance.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      setError("Failed to delete product. Please try again.");
      console.error("Failed to delete product", error);
    }
  };

  // Upload image to Appwrite
  const uploadImageToAppwrite = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const response = await storage.createFile(
        "678bc73e0009c345b3e6",
        ID.unique(),
        file
      );
      const fileUrl = `https://appwrite.clockyeg.com/v1/storage/buckets/678bc73e0009c345b3e6/files/${response.$id}/view?project=678bc6d5000e65b1ae96&mode=admin`;
      return fileUrl;
    } catch (error) {
      setError("Failed to upload image. Please try again.");
      console.error("Error uploading image to Appwrite", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const uploadImagesToAppwrite = async (files: File[]) => {
    setLoading(true);
    setError(null);
    console.log(files);

    try {
      const uploadedImageUrls: string[] = [];

      for (const file of files) {
        const response = await storage.createFile(
          "678bc73e0009c345b3e6", // Replace with your bucket ID
          ID.unique(),
          file
        );
        const fileUrl = `https://appwrite.clockyeg.com/v1/storage/buckets/678bc73e0009c345b3e6/files/${response.$id}/view?project=678bc6d5000e65b1ae96&mode=admin`;
        uploadedImageUrls.push(fileUrl);
      }

      return uploadedImageUrls;
    } catch (error) {
      setError("Failed to upload images. Please try again.");
      console.error("Error uploading images to Appwrite", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        You are not authenticated. Please log in.
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh w-full text-black mt-20">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-20 left-[90%] z-50 p-2 bg-gray-700 text-white rounded sm:hidden"
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        className={`w-64 bg-main p-4 fixed top-16 sm:relative h-full transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        } sm:block z-40`}
      >
        <h2 className="text-lg font-bold mb-4 text-two">Actions</h2>
        <ul className="space-y-2 gap-2 flex flex-col">
          <li>
            <button
              onClick={() => {
                setActiveSection("products");
                setIsSidebarOpen(false); // Close sidebar on mobile
              }}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                activeSection === "products"
                  ? "bg-two text-main font-bold hover:bg-white"
                  : "bg-white hover:bg-white text-main font-bold"
              }`}
            >
              Manage Products
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setActiveSection("orders");
                setIsSidebarOpen(false); // Close sidebar on mobile
              }}
              className={`w-full text-left px-4 py-2 rounded transition-colors ${
                activeSection === "orders"
                  ? "bg-two text-main font-bold"
                  : "bg-white text-main font-bold hover:bg-two"
              }`}
            >
              Manage Orders
            </button>
          </li>
          {activeSection === "products" && (
            <li>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setShowAddProductForm(true);
                  setIsSidebarOpen(false); // Close sidebar on mobile
                }}
                className="w-full text-left px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition-colors"
              >
                Add Product
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2 sm:p-4 ml-0">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-white">
          {activeSection === "orders" ? "Orders" : "Products"}
        </h1>

        {loading && <div className="text-center text-white">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        {activeSection === "products" ? (
          <div>
            {showAddProductForm || editingProduct ? (
              <AddEditProductForm
                onSave={handleSaveProduct}
                editingProduct={editingProduct || undefined}
                uploadImageToAppwrite={uploadImageToAppwrite}
                uploadImagesToAppwrite={uploadImagesToAppwrite}
                availableImages={images}
                onCancel={() => {
                  setShowAddProductForm(false);
                  setEditingProduct(null);
                }}
              />
            ) : (
              <div className="bg-white p-4 rounded shadow-md overflow-x-auto">
                <h2 className="text-lg sm:text-xl font-semibold mb-3">
                  Product List
                </h2>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b p-2">Name</th>
                      <th className="border-b p-2">Price</th>
                      <th className="border-b p-2">Count in Stock</th>
                      <th className="border-b p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="border-b p-2">{product.name}</td>
                        <td className="border-b p-2">${product.price}</td>
                        <td className="border-b p-2">{product.countInStock}</td>
                        <td className="border-b p-2 flex gap-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <Orders />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
