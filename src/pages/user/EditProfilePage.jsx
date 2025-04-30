import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { fetchUserProfile, updateUserProfile } from "../../services/userServices";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "", email: "", address: "", password: "" });
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId)
        .then((res) => setUserData(res.data))
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch user data");
        });
    } else {
      toast.error("User not authenticated");
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(userId, userData)
      .then(() => {
        toast.success("Profile updated successfully!");
        navigate("/userProfile");
      })
      .catch((err) => {
        toast.error("Failed to update profile");
        console.error(err);
      });
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {["name", "email", "address", "password"].map((field) => (
          <div key={field}>
            <label className="block mb-2 font-semibold capitalize">{field}</label>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={userData[field]}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder={`Enter your ${field}`}
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-md transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage;
