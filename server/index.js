
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create a new customer
app.post("/api/customers", (req, res) => {
  const { first_name, last_name, phone_number } = req.body;
  if (!first_name || !last_name || !phone_number) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (!/^\d{10}$/.test(phone_number)) {
    return res.status(400).json({ error: "Phone number must be 10 digits" });
  }
  const query = `INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)`;
  db.run(query, [first_name, last_name, phone_number], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});


// GET all customers with optional filtering + pagination
app.get('/api/customers', (req, res) => {
  const { city, page = 1 } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM customers";
  const values = [];

  if (city) {
    query += " WHERE city = ?";
    values.push(city);
  }

  query += " LIMIT ? OFFSET ?";
  values.push(limit, offset);

  db.all(query, values, (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({
      message: "success",
      data: rows,
      page: Number(page)
    });
  });
});

//page-2
app.get("/api/customers", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const query = "SELECT * FROM customers LIMIT ? OFFSET ?";
  db.all(query, [limit, offset], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


// Get single customer by ID
app.get("/api/customers/:id", (req, res) => {
  const query = `SELECT * FROM customers WHERE id = ?`;
  db.get(query, [req.params.id], (err, row) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(row);
  });
});

// Update customer
app.put("/api/customers/:id", (req, res) => {
  const { first_name, last_name, phone_number } = req.body;
  const query = `UPDATE customers SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?`;
  db.run(query, [first_name, last_name, phone_number, req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Delete customer
app.delete("/api/customers/:id", (req, res) => {
  const query = `DELETE FROM customers WHERE id = ?`;
  db.run(query, [req.params.id], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// ----------------- Address Routes -----------------

// Add new address for a customer
app.post("/api/customers/:id/addresses", (req, res) => {
  const { address_details, city, state, pin_code } = req.body;
  const query = `INSERT INTO addresses (customer_id, address_details, city, state, pin_code) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [req.params.id, address_details, city, state, pin_code], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Get all addresses for a customer
app.get("/api/customers/:id/addresses", (req, res) => {
  const query = `SELECT * FROM addresses WHERE customer_id = ?`;
  db.all(query, [req.params.id], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Update address
app.put("/api/addresses/:addressId", (req, res) => {
  const { address_details, city, state, pin_code } = req.body;
  const query = `UPDATE addresses SET address_details = ?, city = ?, state = ?, pin_code = ? WHERE id = ?`;
  db.run(query, [address_details, city, state, pin_code, req.params.addressId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Delete address
app.delete("/api/addresses/:addressId", (req, res) => {
  const query = `DELETE FROM addresses WHERE id = ?`;
  db.run(query, [req.params.addressId], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

