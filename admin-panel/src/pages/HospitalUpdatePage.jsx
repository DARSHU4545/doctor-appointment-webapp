import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { getHospital } from "../services/HospitalService";

const HospitalUpdatePage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchHospital = async () => {
      const data = await getHospital(id);
      setHospital(data);
      setName(data.name);
      setWebsite(data.website);
      setPhoneNumber(data.phoneNumber);
      setAddress(data.address);
      setImages(data.images);
    };
    fetchHospital();
  }, [id]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("website", website);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images`, image);
      }
    });

    try {
      await axios.put(`http://localhost:5000/api/hospitals/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Redirect or update state after successful update
    } catch (error) {
      console.error("Error updating hospital:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h4 className="text-center mb-4">Update Hospital</h4>
        {hospital && (
          <div className="p-4 border border-gray-300 rounded-lg">
            <div className="mb-4">
              <label className="block text-gray-700">Hospital Name</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Hospital Website</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded w-full"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Hospital Phone Number
              </label>
              <input
                type="text"
                className="mt-1 p-2 border rounded w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Hospital Address</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              {hospital.images.map((image, index) => (
                <img
                  key={index}
                  src={image.imageUrl}
                  alt={hospital.name}
                  width="100"
                  className="mt-4 mb-4"
                />
              ))}
            </div>
            <div>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HospitalUpdatePage;
