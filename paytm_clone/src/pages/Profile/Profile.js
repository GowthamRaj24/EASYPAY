import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Appbar from "../../components/Appbar/Appbar";
import "./Profile.css";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [QrCode, setQrCode] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        country: "",
        city: ""
    });

    useEffect(() => {
        // Fetch user data
        const fetchUserData = async () => {
            try {
                const x = localStorage.getItem("token");
                const token = x.split(" ")[1];
                const response = await axios.post(
                    "http://localhost:4001/users/userData",
                    { token: token }
                );
                setUserData(response.data);
                setFormData({
                    firstName: response.data.firstName || "",
                    lastName: response.data.lastName || "",
                    email: response.data.email || "",
                    country: response.data.country || "",
                    city: response.data.city || ""
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        // Generate QR code
        const qrCode = async (userId) => {
            try {
                const res = await axios.post("http://localhost:4001/qrcode/generateQr", { userId: userId._id });
                setQrCode(res.data.qrCode);
            } catch (err) {
                console.error(err?.response?.data);
            }
        };

        if (userData._id) {
            qrCode(userData);
        }
    }, [userData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const x = localStorage.getItem("token");
            const token = x.split(" ")[1];
            await axios.put("http://localhost:4001/users/update", {
                token: token,
                ...formData
            });
            console.log("Profile updated successfully.");
        } catch (error) {
            console.log("Error updating profile:", error);
        }
    };

    return (
        <>
            <Appbar />
            <div className="profileContainer">
            <aside className="sidebar">
    <img 
        src={userData.profileImage || "/default-logo.png"} 
        alt="User Profile"
        className="profileImage"
    />
    <p className="profileEmail">{userData.email || "email@example.com"}</p>
    <ul>
        <li>
            <NavLink to="/home" activeClassName="active-link">Home</NavLink>
        </li>
        <li>
            <NavLink to="/dashboard" activeClassName="active-link">Dashboard</NavLink>
        </li>
        <li>
            <NavLink to="/transaction-history" activeClassName="active-link">Transfers</NavLink>
        </li>
        <li>
            <NavLink to="/Send" activeClassName="active-link">Send Money</NavLink>
        </li>
        <li>
            <NavLink to="/profile" activeClassName="active-link">Profile</NavLink>
        </li>
    </ul>
    {/* QR Code Section at the Bottom of Sidebar */}
    <div className="qrCodeSection">
        {QrCode ? (
            <img className="qrCodeImage" src={QrCode} alt="Profile QR Code" />
        ) : (
            <div className="qrCodePlaceholder">QR Code</div>
        )}
    </div>
</aside>

                <div className="profileContent">
                    <div className="profileHeader">
                        <div className="profileCard">
                            <img src={userData.profileImage || "/default-logo.png"} alt="Profile" className="profileCardImage" />
                            <h2>{`${formData.firstName} ${formData.lastName}`}</h2>
                            <p>{`${formData.city}, ${formData.country}`}</p>
                            <p>{formData.email}</p>
                            <div className="profileStats">
                                <span><strong>345</strong> Transfer Score</span>
                                <span><strong>124</strong> Transactions</span>
                                <span><strong>63</strong> Events</span>
                            </div>
                        </div>

                        <div className="profileEdit">
                            <h2>Change Your Profile</h2>
                            <form onSubmit={handleSave} className="profileForm">
                                <label>Your Photo</label>
                                <div className="photoUpload">
                                    <img src={userData.profileImage || "/default-avatar.png"} alt="Profile" className="profileEditImage" />
                                    <button type="button">Change photo</button>
                                </div>
                                
                                <label>First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                                
                                <label>Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                                
                                <label>Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                                
                                <label>Country</label>
                                <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
                                
                                <label>City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                                
                                <button type="submit" className="saveButton">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
