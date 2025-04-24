import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { addSeller, deleteSeller, getSellers, updateSeller } from '../../services/sellerServices';

function AdminDashboard() {
  const [sellers, setSellers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [editId, setEditId] = useState(null);

  const fetchSellers = async () => {
    try {
      const res = await getSellers();
      setSellers(res.data);
    } catch (err) {
      console.log(err)
      toast.error("Failed to fetch sellers");
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateSeller(editId, form);
        toast.success("Seller updated");
      } else {
        await addSeller(form);
        toast.success("Seller added");
      }
      setForm({ name: '', email: '', password: '' });
      setEditId(null);
      fetchSellers();
    } catch (err) {
      toast.error(err?.response?.data?.error || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSeller(id);
      toast.success("Seller deleted");
      fetchSellers();
    } catch (err) {
      console.log(err)
      toast.error("Failed to delete seller");
    }
  };

  const handleEdit = (seller) => {
    setForm({ name: seller.name, email: seller.email, password: '' });
    setEditId(seller._id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white dark:bg-gray-900 dark:text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard - Manage Sellers</h2>

      <div className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered w-full mb-2"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full mb-2"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="input input-bordered w-full mb-2"
          value={form.password}
          onChange={handleChange}
        />
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          {editId ? 'Update Seller' : 'Add Seller'}
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Sellers List</h3>
        <div className="space-y-4">
          {sellers.map((seller) => (
            <div key={seller._id} className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-4 rounded">
              <div>
                <p><strong>Name:</strong> {seller.name}</p>
                <p><strong>Email:</strong> {seller.email}</p>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-sm btn-warning" onClick={() => handleEdit(seller)}>Edit</button>
                <button className="btn btn-sm btn-error" onClick={() => handleDelete(seller._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
