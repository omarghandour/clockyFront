/* eslint-disable @next/next/no-img-element */
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
};

type ProductFormProps = {
  onSave: (productData: ProductFormData) => void;
  editingProduct?: ProductFormData;
  uploadImageToAppwrite: (file: File) => Promise<string>;
  availableImages: string[];
};

const AddEditProductForm: React.FC<ProductFormProps> = ({
  onSave,
  editingProduct,
  uploadImageToAppwrite,
  availableImages,
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
  });
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showImageSelection, setShowImageSelection] = useState(false);
  const [showMultipleImageSelection, setShowMultipleImageSelection] =
    useState(false);

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
      setSelectedImage(editingProduct.img);
    }
  }, [editingProduct]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = selectedImage;

    if (imageFile) {
      imageUrl = await uploadImageToAppwrite(imageFile);
    }

    onSave({ ...form, img: imageUrl });
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
    });
    setSelectedImage(undefined);
    setImageFile(null);
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setImageFile(null); // Clear file input if an image is selected
  };

  const handleMultipleImageSelect = (imageUrl: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      images: prevForm.images?.includes(imageUrl)
        ? prevForm.images.filter((img) => img !== imageUrl)
        : [...(prevForm.images || []), imageUrl],
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setSelectedImage(undefined); // Clear selected image if a file is uploaded
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-3">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

      <div className="mb-3">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
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

      <div className="mb-3">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
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
                onClick={() => handleMultipleImageSelect(imageUrl)}
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

      <div className="mb-3">
        <label className="block text-gray-700 mb-2">Upload a New Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

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

      {imageFile && (
        <div className="mb-3">
          <label className="block text-gray-700">Uploaded File:</label>
          <p className="mt-1 text-gray-600">{imageFile.name}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Price</label>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter price"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Previous Price</label>
          <input
            type="text"
            name="before"
            value={form.before}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter previous price"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter product description"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Count in Stock</label>
          <input
            type="text"
            name="countInStock"
            value={form.countInStock}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter stock count"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={form.gender}
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
            value={form.caseColor}
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
            value={form.dialColor}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter dial color"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Movement Type</label>
          <select
            name="movmentType"
            value={form.movmentType}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select movement type</option>
            <option value="automatic">Automatic</option>
            <option value="quartz">Quartz</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="img"
            value={form.img}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            placeholder="Enter image URL"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddEditProductForm;
