import React, { useEffect, useState, useCallback } from "react";
import AddressForm from "./AddressForm";

export default function AddressList({ customerId }) {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadAddresses =useCallback(async () => {
    const res = await fetch(`http://localhost:5000/api/customers/${customerId}/addresses`);
    const data = await res.json();
    setAddresses(data);
  }, [customerId]); // ✅ stable reference

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Address"}
      </button>
      {showForm && (
        <AddressForm customerId={customerId} onSuccess={loadAddresses} />
      )}
      <ul>
        {addresses.map((a) => (
          <li key={a.id}>
            {a.address_details}, {a.city}, {a.state} - {a.pin_code}
          </li>
        ))}
      </ul>
    </div>
  );
}
