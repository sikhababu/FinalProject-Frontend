import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userLogin } from "../../services/userServices";
import { toast } from "sonner";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    userLogin(formData).then((res) => {
      localStorage.setItem("token", res?.data?.token);
      toast.success(res?.data?.message);
      navigate("/");
    }).catch((err) => {
      toast.error(err?.response?.data?.error, "error message");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-gray-900">
      <div className="card w-full max-w-md shadow-xl bg-base-100 dark:bg-gray-800">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4 text-black dark:text-white">Login</h2>

          {error && <div className="alert alert-error mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-black dark:text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-black dark:text-white">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
