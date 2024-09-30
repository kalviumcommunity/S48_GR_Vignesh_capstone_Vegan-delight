import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = React.useState(null);
  const [editMode, setEditMode] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    mobile: "",
    address: "",
    authKey: "",
  });

  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!userId) {
      console.error("User ID not found in session storage");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/users/${userId}`
        );
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          mobile: response.data.mobile,
          address: response.data.address,
          authKey: "",
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/updateuser/${userId}`,
        formData
      );
      setUser(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/deleteuser/${userId}`);
      alert("Profile deleted successfully.");
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout");
      sessionStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      {editMode ? (
        <div className="edit-profile-form">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <input
            type="password"
            name="authKey"
            value={formData.authKey}
            onChange={handleChange}
            placeholder="New Auth Key"
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div className="profile-details">
          <p>Username: {user.username}</p>
          <p>User Type: {user.usertype}</p>
          <p>Email: {user.email}</p>
          <p>Mobile: {user.mobile}</p>
          <p>Address: {user.address}</p>
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
          <button onClick={handleDelete}>Delete Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
