/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";

type ProductFormData = {
  name?: string;
  price?: string;
  before?: string;
  description?: string;
  countInStock?: string;
  gender?: string;
  caseColor?: string;
  dialColor?: string;
  movmentType?: string;
  img?: string;
  images?: string[];
  brand?: string;
  caseSize?: string;
  faceMaterial?: string;
  features?: string;
  modelNumber?: string;
  brandClosure?: string;
  faceDialShape?: string;
  faceDialType?: string;
  productClass?: string;
  attachment?: string[];
};

type ProductFormProps = {
  onSave: (productData: ProductFormData) => void;
  editingProduct?: ProductFormData;
  uploadImageToAppwrite: (file: File) => Promise<string>;
  uploadImagesToAppwrite: (files: File[]) => Promise<string[]>;
  availableImages: string[];
  onCancel: () => void;
};

const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"]; // Add more if needed

const AddEditProductForm: React.FC<ProductFormProps> = ({
  onSave,
  editingProduct,
  uploadImageToAppwrite,
  uploadImagesToAppwrite,
  availableImages,
  onCancel,
}) => {
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    price: "",
    before: "",
    description: "",
    countInStock: "",
    gender: "",
    caseColor: "",
    dialColor: "",
    movmentType: "",
    img: "",
    images: [],
    brand: "",
    caseSize: "",
    faceMaterial: "",
    features: "",
    modelNumber: "",
    brandClosure: "",
    faceDialShape: "",
    faceDialType: "",
    productClass: "",
    attachment: [],
  });
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [showImageSelection, setShowImageSelection] = useState(false);
  const [showMultipleImageSelection, setShowMultipleImageSelection] =
    useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  // Initialize form with editing product data
  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
      setSelectedImage(editingProduct.img);
    }
  }, [editingProduct]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle single image selection from available images
  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageFile(null); // Clear file input if an image is selected
  };

  // Handle file input change for single image upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();

      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        setImageFile(file);
        setSelectedImage(undefined); // Clear selected image if a file is uploaded
      } else {
        alert(`File extension .${fileExtension} is not allowed.`);
      }
    }
  };

  // Handle multiple file input change
  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter((file) => {
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        return fileExtension && allowedExtensions.includes(fileExtension);
      });

      if (validFiles.length !== filesArray.length) {
        alert("Some files have invalid extensions and were not selected.");
      }

      setImageFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setForm((prevForm) => ({
        ...prevForm,
        images: [
          ...(prevForm.images || []),
          ...validFiles.map((file) => URL.createObjectURL(file)),
        ],
      }));
    }
  };

  // Handle selecting existing images for multiple image selection
  const handleMultipleImageSelect = (imageUrl: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      images: prevForm.images?.includes(imageUrl)
        ? prevForm.images.filter((img) => img !== imageUrl) // Deselect if already selected
        : [...(prevForm.images || []), imageUrl], // Add to selected images
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    try {
      let imageUrl = selectedImage;
      let uploadedImageUrls: string[] = [];

      // Upload new single image if a file is selected
      if (imageFile) {
        imageUrl = await uploadImageToAppwrite(imageFile);
      }

      // Upload multiple images if selected
      if (imageFiles.length > 0) {
        uploadedImageUrls = await uploadImagesToAppwrite(imageFiles);
      }

      // Save the product data with the uploaded images
      onSave({
        ...form,
        img: imageUrl,
        images: uploadedImageUrls.length > 0 ? uploadedImageUrls : form.images,
      });

      // Reset form after submission if not editing
      if (!editingProduct) {
        setForm({
          name: "",
          price: "",
          before: "",
          description: "",
          countInStock: "",
          gender: "",
          caseColor: "",
          dialColor: "",
          movmentType: "",
          img: "",
          images: [],
          brand: "",
          caseSize: "",
          faceMaterial: "",
          features: "",
          modelNumber: "",
          brandClosure: "",
          faceDialShape: "",
          faceDialType: "",
          productClass: "",
          attachment: [],
        });
        setSelectedImage(undefined);
        setImageFile(null);
        setImageFiles([]);
      }
    } catch (error) {
      console.error("Error uploading images or saving product", error);
    } finally {
      setLoading(false); // Set loading to false when submission is complete
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-3">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

      {/* Image Selection Section */}
      <div className="mb-3">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={() => setShowImageSelection(!showImageSelection)}
        >
          {showImageSelection ? "Hide Images" : "Select an Image"}
        </button>
        {showImageSelection && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {availableImages.map((imageUrl) => (
              <div
                key={imageUrl}
                className={`cursor-pointer p-1 border ${
                  selectedImage === imageUrl
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleImageSelect(imageUrl)}
              >
                <img
                  src={imageUrl}
                  alt="Product"
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Multiple Image Selection Section */}
      <div className="mb-3">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          onClick={() =>
            setShowMultipleImageSelection(!showMultipleImageSelection)
          }
        >
          {showMultipleImageSelection
            ? "Hide Images"
            : "Select Multiple Images"}
        </button>
        {showMultipleImageSelection && (
          <div className="grid grid-cols-3 gap-3 mt-3">
            {availableImages.map((imageUrl) => (
              <div
                key={imageUrl}
                className={`cursor-pointer p-1 border ${
                  form.images?.includes(imageUrl)
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleMultipleImageSelect(imageUrl)} // Use the new handler
              >
                <img
                  src={imageUrl}
                  alt="Product"
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* File Upload Section */}
      <div className="mb-3">
        <label className="block text-gray-700 mb-2">Upload a New Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      {/* Multiple File Upload Section */}
      <div className="mb-3">
        <label className="block text-gray-700 mb-2">
          Upload Multiple Images:
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleMultipleFileChange}
        />
      </div>

      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="mb-3">
          <label className="block text-gray-700">Selected Image:</label>
          <img
            src={selectedImage}
            alt="Selected"
            className="w-24 h-24 object-cover border border-blue-500 mt-2"
          />
        </div>
      )}

      {/* Uploaded File Preview */}
      {imageFile && (
        <div className="mb-3">
          <label className="block text-gray-700">Uploaded File:</label>
          <p className="mt-1 text-gray-600">{imageFile.name}</p>
        </div>
      )}

      {/* Selected Multiple Images Preview */}
      {form.images && form.images.length > 0 && (
        <div className="mb-3">
          <label className="block text-gray-700">
            Selected Multiple Images:
          </label>
          <div className="grid grid-cols-3 gap-3 mt-2">
            {form.images.map((imageUrl, index) => (
              <div key={index} className="relative">
                <img
                  src={imageUrl}
                  alt={`Selected ${index}`}
                  className="w-full h-24 object-cover border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => handleMultipleImageSelect(imageUrl)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Product Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={form.price || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter price"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Previous Price</label>
          <input
            type="number"
            name="before"
            value={form.before || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter previous price"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter product description"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Count in Stock</label>
          <input
            type="number"
            name="countInStock"
            value={form.countInStock || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter stock count"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={form.gender || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Case Color</label>
          <input
            type="text"
            name="caseColor"
            value={form.caseColor || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter case color"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Dial Color</label>
          <input
            type="text"
            name="dialColor"
            value={form.dialColor || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter dial color"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Movement Type</label>
          <select
            name="movmentType"
            value={form.movmentType || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select movement type</option>
            <option value="automatic">Automatic</option>
            <option value="quartz">Quartz</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={form.brand || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter brand"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Case Size</label>
          <input
            type="text"
            name="caseSize"
            value={form.caseSize || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter case size"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Face Material</label>
          <input
            type="text"
            name="faceMaterial"
            value={form.faceMaterial || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter face material"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Features</label>
          <input
            type="text"
            name="features"
            value={form.features || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter features"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Model Number</label>
          <input
            type="text"
            name="modelNumber"
            value={form.modelNumber || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter model number"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Brand Closure</label>
          <input
            type="text"
            name="brandClosure"
            value={form.brandClosure || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter brand closure"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Face Dial Shape</label>
          <input
            type="text"
            name="faceDialShape"
            value={form.faceDialShape || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter face dial shape"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Face Dial Type</label>
          <input
            type="text"
            name="faceDialType"
            value={form.faceDialType || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter face dial type"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Product Class</label>
          <input
            type="text"
            name="productClass"
            value={form.productClass || ""} // Ensure value is never undefined
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter product class"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading} // Disable the button when loading
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {editingProduct ? "Updating..." : "Adding..."}
              </>
            ) : editingProduct ? (
              "Update Product"
            ) : (
              "Add Product"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditProductForm;
