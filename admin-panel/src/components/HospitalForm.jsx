import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const HospitalForm = ({ fetchHospitals }) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);

  const onDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("website", website);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    try {
      await axios.post("http://localhost:5000/api/hospitals/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setName("");
      setWebsite("");
      setPhoneNumber("");
      setAddress("");
      setImages([]);
      if (fetchHospitals) fetchHospitals();
    } catch (error) {
      console.error("Error uploading hospital:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border border-gray-300 rounded-lg"
    >
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
        <label className="block text-gray-700">Hospital Phone Number</label>
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
      <div
        {...getRootProps({
          className: "border-2 border-dashed p-4 mb-4 cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        {images.length > 0 ? (
          <div>
            {images.map((image, index) => (
              <div key={index} className="flex items-center justify-between">
                <p>{image.name}</p>
                <button
                  type="button"
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>Drag & drop images here, or click to select them</p>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default HospitalForm;
