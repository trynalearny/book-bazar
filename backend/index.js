const express = require('express');
const app = express();
// CORS
const cors = require("cors");
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));

// Routes
const bookRoutes = require('./src/books/book.route');
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");
const paymentRoutes=require("./src/pay/paymentRoutes");
// Use routes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment",paymentRoutes);
// Root route should only return JSON
app.get('/', (req, res) => {
    res.json({ message: "Welcome to my server" });
});

async function main() {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected successfully");
}

main().catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
