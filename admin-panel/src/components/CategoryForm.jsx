import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const CategoryForm = ({ fetchCategories }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      await axios.post(
        "https://doctor-appointment-webapp-bakend.onrender.com/api/categories",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setImage(null);
      if (fetchCategories) fetchCategories();
    } catch (error) {
      console.error("Error uploading category:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border border-gray-300 rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Category Name</label>
        <input
          type="text"
          className="mt-1 p-2 border rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div
        {...getRootProps({
          className: "border-2 border-dashed p-4 mb-4 cursor-pointer",
        })}
      >
        <input {...getInputProps()} />
        {image ? (
          <div>
            <p>{image.name}</p>
            <button
              type="button"
              onClick={() => setImage(null)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Remove
            </button>
          </div>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
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

export default CategoryForm;
