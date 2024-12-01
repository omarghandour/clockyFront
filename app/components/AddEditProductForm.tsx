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
};

type ProductFormProps = {
  onSave: (productData: ProductFormData) => void;
  editingProduct?: ProductFormData;
  uploadImageToAppwrite: any;
};

const AddEditProductForm: React.FC<ProductFormProps> = ({
  onSave,
  editingProduct,
  uploadImageToAppwrite,
}) => {
  const [formData, setFormData] = useState(editingProduct || {});
  const [imageFile, setImageFile] = useState(null);
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
  });

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
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
    let imageUrl = formData.img;
    if (imageFile) {
      imageUrl = await uploadImageToAppwrite(imageFile);
    }
    onSave({ ...form, img: imageUrl }); // Update form with imageUrl
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
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-3">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e: any) => setImageFile(e.target.files[0])}
        />
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
