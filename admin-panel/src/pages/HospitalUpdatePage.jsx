import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { getHospital } from "../services/HospitalService";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
} from "@mui/material";

const HospitalUpdatePage = () => {
  const { id } = useParams();
  const [hospital, setHospital] = useState(null);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const data = await getHospital(id);
        setHospital(data);
        setName(data.name);
        setWebsite(data.website);
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        setDescription(data.description);
        setSelectedCategories(data.categories.map((cat) => cat._id));
        setIsPremium(data.isPremium);
        setImages(data.images);
        setEmail(data.email);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hospital:", error);
      }
    };
    fetchHospital();
  }, [id]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("website", website);
    formData.append("phoneNumber", phoneNumber);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("isPremium", isPremium);
    formData.append("email", email);
    selectedCategories.forEach((category) => {
      formData.append("categories", category);
    });
    images.forEach((image, index) => {
      if (image instanceof File) {
        formData.append(`images`, image);
      }
    });

    try {
      await axios.put(
        `https://doctor-appointment-webapp-bakend.onrender.com/api/hospitals/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Redirect or update state after successful update
    } catch (error) {
      console.error("Error updating hospital:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h4 className="text-center mb-4">Update Hospital</h4>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <CircularProgress color="primary" />
          </div>
        ) : (
          <div className="p-4 border border-gray-300 rounded-lg">
            <div className="mb-4">
              <TextField
                label="Hospital Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Hospital Website"
                variant="outlined"
                fullWidth
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Hospital Phone Number"
                variant="outlined"
                fullWidth
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Hospital Address"
                variant="outlined"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <FormControl fullWidth>
                <InputLabel>Categories</InputLabel>
                <Select
                  multiple
                  value={selectedCategories}
                  onChange={(e) => setSelectedCategories(e.target.value)}
                  required
                  inputProps={{
                    name: "categories",
                    id: "categories",
                  }}
                >
                  {hospital?.categories?.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select one or more categories</FormHelperText>
              </FormControl>
            </div>
            <div className="mb-4">
              <FormControl fullWidth>
                <InputLabel>Is Premium</InputLabel>
                <Select
                  value={isPremium}
                  onChange={(e) => setIsPremium(e.target.value === "true")}
                  required
                  inputProps={{
                    name: "isPremium",
                    id: "isPremium",
                  }}
                >
                  <MenuItem value={"true"}>Yes</MenuItem>
                  <MenuItem value={"false"}>No</MenuItem>
                </Select>
                <FormHelperText>
                  Select if the hospital is premium
                </FormHelperText>
              </FormControl>
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
              <Button
                onClick={handleUpdate}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HospitalUpdatePage;
