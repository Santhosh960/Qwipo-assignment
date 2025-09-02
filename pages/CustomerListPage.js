import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerList from '../Components/CustomerList';

function CustomerListPage() {
    const [customers, setCustomers] = useState([]);
    const [error,setError]=useState(null)
    const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("name"); 


    useEffect(() => {
        // Fetch customers from the backend API
        axios.get('http://localhost:5000/api/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                setError('There was an error fetching the customers!', error);
            });
    }, []); // Empty array means this effect runs once on component mount


    const filteredCustomers = customers.filter((c) => {
    if (filterBy === "name") {
      const fullName = `${c.first_name} ${c.last_name}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
    } else if (filterBy === "phone") {
      return c.phone_number.includes(searchTerm);
    }
    return true; 
  });

    return (
        <div className="p-6 mx-auto">
            <h1 className="font-bold mb-4">Customer List</h1>
            <input
        type="text"
        placeholder={`Search by ${filterBy}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />

      {/* Filter dropdown */}
      <select
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
        style={{ padding: "5px" }}
      >
        <option value="name">Name</option>
        <option value="phone">Phone</option>
      </select>
      <CustomerList customers={filteredCustomers} />
        </div>
    );
}

export default CustomerListPage;

