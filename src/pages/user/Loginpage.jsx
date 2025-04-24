import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../services/userServices";
import { toast } from "sonner";

const LoginPage = ({ role = "user" }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    userLogin(formData, role)
      .then((res) => {
        const userId = res?.data?.user?._id
        const token = res?.data?.token;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId)
        toast.success(res?.data?.message);

        // Redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "seller") {
          navigate("/seller/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "Login failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-gray-900">
      <div className="card w-full max-w-md shadow-xl bg-base-100 dark:bg-gray-800">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4 text-black dark:text-white">
            {role === "admin" ? "Admin Login" : role === "seller" ? "Seller Login" : "User Login"}
          </h2>

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
            <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign up here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
