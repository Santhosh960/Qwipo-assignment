import React, { useState } from "react";

export default function AddressForm({ customerId, onSuccess }) {
  const [form, setForm] = useState({
    address_details: "",
    city: "",
    state: "",
    pin_code: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/customers/${customerId}/addresses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => {
      setForm({ address_details: "", city: "", state: "", pin_code: "" });
      onSuccess();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="address_details" placeholder="Address" value={form.address_details} onChange={handleChange} required />
      <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
      <input name="state" placeholder="State" value={form.state} onChange={handleChange} required />
      <input name="pin_code" placeholder="Pin Code" value={form.pin_code} onChange={handleChange} required />
      <button type="submit">Save</button>
    </form>
  );
}
