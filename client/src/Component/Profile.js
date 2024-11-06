import React, { useEffect, useState, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { tokenId } from "../App";

const Profile = () => {
  const [token] = useContext(tokenId);

  const params = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/profile/${params.id}`
        );
        setProfile(res.data);
      } catch (error) {
        console.log("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, [params.id]);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="profile-container">
      <h1>Profile Data</h1>
      <img src="/2D5A3602.png" alt="profilepicture" className="logo-profile" />
      <table className="profile-table">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="id-cell">{profile._id}</td>
            <td>{profile.Name}</td>
            <td>{profile.Email}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
