import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { userSignup } from "../../services/userServices";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await userSignup(formData);
      toast.success(res?.data?.message || "Signup successful");
      navigate("/login"); // Redirect to login after signup
    } catch (error) {
      toast.error(error?.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 dark:bg-gray-900">
      <div className="card w-full max-w-md shadow-xl bg-base-100 dark:bg-gray-800">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4 text-black dark:text-white">User Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-black dark:text-white">Name</span>
              </label>
              <input
                type="text"
                name="name"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

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

            <div className="form-control mb-4">
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

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-black dark:text-white">Address</span>
              </label>
              <input
                type="text"
                name="address"
                className="input input-bordered dark:bg-gray-800 dark:text-white"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary font-medium hover:underline dark:text-blue-400"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
