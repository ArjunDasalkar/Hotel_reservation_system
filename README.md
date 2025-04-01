# **Hotel Reservation System Backend** 🏨🚀  
A **backend API** built with **Node.js, Express, and MySQL** for managing hotel reservations, rooms, and customers. Designed for admin use only.

---

## **📌 Features**
- 🔐 **Admin authentication** (JWT-based)  
- 📄 **CRUD operations** for **Customers, Rooms, and Reservations**  
- 🔍 **Sorting support** for better data management  
- 📂 **MySQL database schema included**  
- 🔥 **Secure password hashing with bcrypt**  

---

## **📦 Installation**  

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/hotel_reservation_backend.git
cd hotel_reservation_backend
```

### **2️⃣ Install Dependencies**
```bash
npm install
```

### **3️⃣ Set Up the Database**
1. Install **MySQL** if you haven’t already.
2. Open MySQL and create a database:
   ```sql
   CREATE DATABASE hotel_db;
   ```
3. Import the schema from the provided `.sql` file:
   ```bash
   mysql -u your_username -p hotel_db < Database-mysql/hotel_db_schema.sql
   ```
   _(Replace `your_username` with your actual MySQL username.)_

### **4️⃣ Configure Environment Variables**
Create a `.env` file in the root directory and add:
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=hotel_db
JWT_SECRET=your_secret_key
PORT=5000
```

### **5️⃣ Start the Server**
```bash
npm start
```
Server will run at **http://localhost:5000** 🎉  

---

## **🛠 API Endpoints**
### 🔐 **Admin Authentication**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/admin/register` | Register a new admin (one-time setup) |
| `POST` | `/admin/login` | Login as admin and get a JWT token |

### 👥 **Customers API**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/customers` | Get all customers (supports sorting) |
| `POST` | `/customers` | Add a new customer |
| `PUT` | `/customers/:id` | Update a customer’s details |
| `DELETE` | `/customers/:id` | Delete a customer |

### 🏨 **Rooms API**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/rooms` | Get all rooms (supports sorting) |
| `POST` | `/rooms` | Add a new room |
| `PUT` | `/rooms/:id` | Update room details |
| `DELETE` | `/rooms/:id` | Delete a room |

### 📅 **Reservations API**
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET` | `/reservations` | Get all reservations (supports sorting) |
| `POST` | `/reservations` | Create a reservation |
| `PUT` | `/reservations/:id` | Update a reservation |
| `DELETE` | `/reservations/:id` | Cancel a reservation |

_(All `GET` requests support sorting via query parameters: `?sort_by=column_name&order=ASC|DESC`)_  

---

## **🔗 Tech Stack**
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Auth:** JWT, bcrypt  
- **Validation:** express-validator  

---

## **👨‍💻 Developed By**
🚀 **MustangD**  
📌 **GitHub:** [ArjunDasalkar](https://github.com/ArjunDasalkar)  

---

## **💡 Future Enhancements**
✅ Add **pagination** for large datasets  
✅ Implement **filtering** (e.g., filter rooms by price range)  
✅ Create a **frontend** (Next.js / React)  

---
