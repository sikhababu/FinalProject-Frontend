import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { createProduct, deleteProduct, listSellerProducts, updateProduct } from "../../services/productServices";
import { getSellerOrders, updateOrderStatus } from "../../services/orderServices"; // <--- New service functions

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); // <--- New state for orders
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
      const res = await listSellerProducts();
      setProducts(res.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch products");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await getSellerOrders(); // API to fetch seller's orders
      setOrders(res.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
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
      setFormData({ title: "", description: "", price: "", stock: "", image: null, category: "" });
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

  const handleStatusChange = async (orderId, currentStatus) => {
    const nextStatus =
      currentStatus === "processing" ? "shipped" :
        currentStatus === "shipped" ? "delivered" : "delivered"; // no change after delivered

    try {
      await updateOrderStatus(orderId, nextStatus);
      toast.success(`Order status updated to ${nextStatus}`);
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update status");
    }
  };

  return (
    <div className="p-4 dark:bg-gray-900 dark:text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Seller Dashboard</h2>

      {/* Product Form */}
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
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="p-2 border rounded dark:bg-gray-700"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="category"
          value={formData.category}
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

      {/* Products List */}
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
                {product.image?.url && (
                  <img src={product.image.url} alt={product.title} className="w-32 mt-2" />
                )}
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

      {/* Orders Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Your Orders</h3>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="grid gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border p-4 rounded shadow dark:bg-gray-800"
              >
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Buyer:</strong> {order.user?.name || "Unknown"}</p>
                <div>
                  <h4 className="font-semibold mb-2">Products:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {order.products.map((product, index) => (
                      product?.productId ? (
                        <li key={product.productId._id}>
                          {product.productId.title} - Quantity: {product.quantity}
                        </li>
                      ) : (
                        <li key={index} className="text-red-500">
                          Product not found
                        </li>
                      )
                    ))}
                  </ul>
                </div>
                <p><strong>Payment Status:</strong> {order?.paymentStatus}</p>
                <p><strong>Order Status:</strong> {order?.orderStatus}</p>

                <div className="flex gap-2 mt-2">
                  {order.orderStatus !== "delivered" && (
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() => handleStatusChange(order._id, order.orderStatus)}
                    >
                      Mark as {order.orderStatus === "processing" ? "Shipped" : "Delivered"}
                    </button>
                  )}
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
