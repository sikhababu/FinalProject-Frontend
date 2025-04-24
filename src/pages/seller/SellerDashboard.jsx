import React, { useEffect, useState } from "react";

import { toast } from "sonner";
import { createProduct, deleteProduct, listProducts, updateProduct } from "../../services/productServices";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await listProducts();
      setProducts(res.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      if (editingProductId) {
        await updateProduct(editingProductId, data);
        toast.success("Product updated successfully");
        setEditingProductId(null);
      } else {
        await createProduct(data);
        toast.success("Product created successfully");
      }
      fetchProducts();
      setFormData({ title: "", description: "", price: "", stock: "", image: null });
    } catch (error) {
      toast.error(error.response?.data?.error || "Operation failed");
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 bg-white dark:bg-gray-800 p-4 rounded shadow-md"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700"
          required
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700"
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {editingProductId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Your Products</h3>
        {products.length === 0 ? (
          <p>No products added yet.</p>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded shadow dark:bg-gray-800"
              >
                <h4 className="text-lg font-bold">{product.title}</h4>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                <img src={product.image?.url} alt={product.title} className="w-32 mt-2" />
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
