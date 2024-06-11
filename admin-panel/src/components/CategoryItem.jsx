import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryItem = ({ category, fetchCategories }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://doctor-appointment-webapp-bakend.onrender.com/api/categories/${category._id}`
      );
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <Box className="p-4 border border-gray-300 rounded-lg mb-4">
      <Typography variant="h6">{category.name}</Typography>
      <img
        src={category.imageUrl}
        alt={category.name}
        width="100"
        className="mt-4 mb-4"
      />
      <Box>
        <Button
          onClick={() => navigate(`/categories/update/${category._id}`)}
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
        <Button onClick={handleDelete} className="ml-2">
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default CategoryItem;
