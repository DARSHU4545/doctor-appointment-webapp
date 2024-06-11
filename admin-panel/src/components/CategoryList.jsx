import React from "react";
import CategoryItem from "./CategoryItem";
import { Box, Typography } from "@mui/material";

const CategoryList = ({ categories, fetchCategories }) => {
  return (
    <Box>
      <Typography variant="h5" className="mb-4">
        Category List
      </Typography>
      {categories.map((category) => (
        <CategoryItem
          key={category._id}
          category={category}
          fetchCategories={fetchCategories}
        />
      ))}
    </Box>
  );
};

export default CategoryList;
