import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AddressList from "../Components/AddressList";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/customers/${id}`)
      .then((res) => res.json())
      .then((data) => setCustomer(data));
  }, [id]);

  if (!customer) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2>
        {customer.first_name} {customer.last_name}
      </h2>
      <p> {customer.phone_number}</p>
      <li key={customer.id}>
        <Link to={`/customers/${customer.id}`}>
        {customer.first_name} {customer.last_name}
        </Link>
      </li>
      <h3>Addresses</h3>
      <AddressList customerId={id} />
    </div>
  );
}
