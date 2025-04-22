import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users } from "lucide-react";

const AuthorFilterDropdown = ({ onAuthorPostsFetched }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("All");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/users");
        setUsers(Object.values(res.data));
        console.log(res.data)
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = async (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);

    if (userId === "All") {
      onAuthorPostsFetched("All");
    } else {
      try {
        const res = await axios.get(`http://localhost:5000/post/user/${userId}`);
        onAuthorPostsFetched(res.data);
      } catch (err) {
        console.error("Error fetching posts by user:", err);
      }
    }
  };

  return (
    <select
      value={selectedUserId}
      onChange={handleChange}
      className="mb-6 p-2 border border-gray-300 rounded"
    >
      <option value="All">All Authors</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.username}
        </option>
      ))}
    </select>
  );
};

export default AuthorFilterDropdown;
