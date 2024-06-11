import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryListPage from "./pages/CategoryListPage";
import CategoryUploadPage from "./pages/CategoryUploadPage";
import CategoryUpdatePage from "./pages/CategoryUpdatePage";
import HomePage from "./pages/Home";
import HospitalListPage from "./pages/HospitalListPage";
import HospitalUploadPage from "./pages/HospitalUploadPage";
import HospitalUpdatePage from "./pages/HospitalUpdatePage";
import Error from "./pages/Error";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="*" element={<Error />} />
        <Route path="/categories" element={<CategoryListPage />} />
        <Route path="/categories/upload" element={<CategoryUploadPage />} />
        <Route path="/categories/update/:id" element={<CategoryUpdatePage />} />
        <Route path="/hospitals" element={<HospitalListPage />} />
        <Route path="/hospitals/upload" element={<HospitalUploadPage />} />
        <Route path="/hospitals/update/:id" element={<HospitalUpdatePage />} />
      </Routes>
    </Router>
  );
};

export default App;
