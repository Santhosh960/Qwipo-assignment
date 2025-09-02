import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/customers?page=2")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  return (
    <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.first_name} {c.last_name}</td>
            <td>{c.phone_number}</td>
            <td>
              <Link to={`/customers/${c.id}`}>View</Link> |{" "}
              <Link to={`/customers/${c.id}/edit`}>Edit</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
