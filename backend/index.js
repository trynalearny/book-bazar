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
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://bookbazarr.netlify.app', /^https:\/\/.*--bookbazarr\.netlify\.app$/]
        : ['http://localhost:5173'],
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
const path = require('path');
app.use('/images', express.static(path.join(__dirname, '../frontend/src/assets/books')));

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
    
    // Create default admin if doesn't exist
    const User = require('./src/users/user.model');
    
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
        const defaultAdmin = new User({
            username: 'admin',
            password: 'kasturi',
            role: 'admin'
        });
        await defaultAdmin.save();
        console.log('Default admin created: username=admin, password=kasturi');
    } else {
        console.log('Admin user already exists');
    }
}

main().catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
