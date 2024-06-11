import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HospitalItem = ({ hospital, fetchHospitals }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/hospitals/${hospital._id}`);
      fetchHospitals();
    } catch (error) {
      console.error("Error deleting hospital:", error);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg mb-4">
      <h6>{hospital.name}</h6>
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
      <div className="mb-4">
        <p>Website: {hospital.website}</p>
        <p>Phone: {hospital.phoneNumber}</p>
        <p>Address: {hospital.address}</p>
      </div>
      <div>
        <button
          onClick={() => navigate(`/hospitals/update/${hospital._id}`)}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default HospitalItem;
