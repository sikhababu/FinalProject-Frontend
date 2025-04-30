import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchUserProfile } from '../../services/userServices'; // Import the API call

function UserProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId'); //  userId is stored in localStorage


    if (!userId) {
      toast.error('User not found or not authenticated');
      navigate('/login'); // Redirect to login if no user ID or token
      return;
    }

    fetchUserProfile(userId)  // Use the API function to fetch user profile
      .then((response) => {
        console.log(response)
        setUserDetails(response.data.userObject);  // Assuming the response contains the user data
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.error || 'Failed to fetch user details');
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!userDetails) return <div className="text-center mt-10">No user profile found.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>
      <div className="space-y-4">
        <div className="card bg-base-100 dark:bg-gray-800 shadow-md p-4">
          <div className="flex gap-6">

            <div className="flex-1">
              <h3 className="text-xl font-semibold">{userDetails.name}</h3>
              <p className="text-sm">Email : {userDetails.email}</p>
              <p className="text-sm">Role  : {userDetails.role}</p>
              <p className="text-sm">Address  : {userDetails.address || 'Not Provided'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/edit-profile')}
        >
          Edit Profile
        </button>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/orders')}
        >
          View your orders
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
