import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CustomerForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ first_name: "", last_name: "", phone_number: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/customers/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Validation function
  const validate = () => {
    let newErrors = {};

    if (!form.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }
    if (!form.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }
    if (!form.phone_number) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone_number)) {
      newErrors.phone_number = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // valid if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:5000/api/customers/${id}`
      : "http://localhost:5000/api/customers";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => navigate("/"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="first_name"
        placeholder="First Name"
        value={form.first_name}
        onChange={handleChange}
        required
      />
      <input
        name="last_name"
        placeholder="Last Name"
        value={form.last_name}
        onChange={handleChange}
        required
      />
      <input
        name="phone_number"
        placeholder="Phone"
        value={form.phone_number}
        onChange={handleChange}
        required
      />
      <button type="submit">{id ? "Update" : "Create"}</button>
    </form>
  );
}
