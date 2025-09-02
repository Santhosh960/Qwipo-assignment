import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerListPage from "./Pages/CustomerListPage";
import CustomerDetailPage from "./Pages/CustomerDetailPage";
import CustomerFormPage from "./Pages/CustomerFormPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerListPage />} />
        <Route path="/customers/new" element={<CustomerFormPage />} />
        <Route path="/customers/:id" element={<CustomerDetailPage />} />
        <Route path="/customers/:id/edit" element={<CustomerFormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
