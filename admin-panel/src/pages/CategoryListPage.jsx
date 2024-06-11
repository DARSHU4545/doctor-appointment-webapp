import React, { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import { getCategories } from "../services/CategoryService";
import { Container, Typography } from "@mui/material";
import Layout from "./Layout";

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Layout>
      <Container className="py-8">
        <Typography variant="h4" className="mb-8">
          Category Management
        </Typography>
        <CategoryList
          categories={categories}
          fetchCategories={fetchCategories}
        />
      </Container>
    </Layout>
  );
};

export default CategoryListPage;
