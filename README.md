"# Qwipo-assignment" - CUSTOMER-MANAGEMENT-APP

A full-stack web application for managing customer and address information, built with Node.js, Express.js, SQLite, and React.

🚀 Features
Customer Management: Create, read, update, and delete customer records
Address Management: Add multiple addresses per customer
Search & Filtering: Search customers by name or phone number
Sorting: Sort customers by first name, last name, or phone number
Pagination: Navigate through large customer lists
Responsive Design: Modern, mobile-friendly UI
Form Validation: Client-side and server-side validation
Real-time Updates: Instant feedback and data refresh
🛠️ Tech Stack
Backend
Node.js - JavaScript runtime
Express.js - Web framework
SQLite - Lightweight database
express-validator - Input validation
Frontend
React - UI library
React Router - Client-side routing
Axios - HTTP client
CSS3 - Modern styling with responsive design
📁 Project Structure
customer-management-app/

├── server/                 # Backend code
│   ├── database/          # Database setup and connection
│   ├── middleware/        # Validation middleware
│   ├── routes/            # API endpoints
│   ├── index.js           # Main server file
│   └── package.json       # Backend dependencies
├── client/                # Frontend code
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── App.js         # Main app component
│   │   └── index.js       # React entry point
│   └── package.json       # Frontend dependencies
└── package.json           # Root package.json

🚀 Quick Start
Prerequisites
Node.js (v14 or higher)
npm or yarn
1. Clone and Install Dependencies
# Clone the repository
git clone <repository-url>
cd customer-management-app

# Install all dependencies (root, server, and client)
npm run install-all
2. Initialize Database
# Initialize the SQLite database with sample data
npm run db:init
3. Start the Application
# Start both backend and frontend simultaneously
npm start
This will start:

Backend: http://localhost:5000/
Frontend: http://localhost:3000/
Alternative: Run Separately
# Terminal 1 - Start backend
npm run server

# Terminal 2 - Start frontend
npm run client
📊 API Endpoints
Customers
GET /api/customers - Get all customers (with search, sorting, pagination)
GET /api/customers/:id - Get customer by ID
POST /api/customers - Create new customer
PUT /api/customers/:id - Update customer
DELETE /api/customers/:id - Delete customer
Addresses
GET /api/addresses/customers/:id/addresses - Get addresses for customer
POST /api/addresses/customers/:id/addresses - Add address for customer
PUT /api/addresses/:addressId - Update address
DELETE /api/addresses/:addressId - Delete address
Health Check
GET /api/health - Server health status
🎯 Usage
Adding a Customer
Navigate to "Add Customer" from the main menu
Fill in the required fields (First Name, Last Name, Phone Number)
Click "Create Customer"
You'll be redirected to the customer detail page
Managing Addresses
View a customer's details
Click "Add New Address" to add an address
Fill in address details (Address, City, State, Pin Code)
Use Edit/Delete buttons to manage existing addresses
Searching and Filtering
Use the search bar to find customers by name or phone number
Sort by different fields (First Name, Last Name, Phone Number)
Choose sort order (Ascending/Descending)
Adjust items per page (5, 10, 20, 50)
🔧 Development
Backend Development
cd server
npm run dev  # Start with nodemon for auto-reload
Frontend Development
cd client
npm start    # Start React development server
Database Management
cd server
npm run db:init  # Reinitialize database
📝 Environment Variables
Create a .env file in the server directory:

PORT=5000
NODE_ENV=development
🧪 Testing
# Test backend
cd server
npm test

# Test frontend
cd client
npm test
🚀 Production Build
# Build frontend for production
cd client
npm run build

# Start production server
cd server
NODE_ENV=production npm start
📱 Features in Detail
Customer Management
Validation: Required fields, length limits, phone number format
Unique Constraints: Phone numbers must be unique
Cascade Delete: Deleting a customer removes all associated addresses
Address Management
Multiple Addresses: Each customer can have multiple addresses
Full CRUD: Create, read, update, and delete addresses
Validation: Required fields with appropriate length limits
Search & Filtering
Real-time Search: Debounced search with instant results
Flexible Sorting: Sort by any customer field
Pagination: Efficient handling of large datasets
User Experience
Responsive Design: Works on all device sizes
Loading States: Visual feedback during operations
Error Handling: Clear error messages and validation
Success Feedback: Confirmation messages and redirects
🤝 Contributing
Fork the repository
Create a feature branch
Make your changes
Add tests if applicable
Submit a pull request
📄 License
This project is licensed under the MIT License.

🆘 Support
If you encounter any issues or have questions:

Check the console for error messages
Verify the database is properly initialized
Ensure all dependencies are installed
Check that both backend and frontend are running
🔮 Future Enhancements
User authentication and authorization
Advanced filtering (by city, state, date range)
Export functionality (CSV, PDF)
Bulk operations
Audit logging
API rate limiting
Docker containerization
Unit and integration tests
