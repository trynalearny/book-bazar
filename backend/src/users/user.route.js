const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Register new user/admin
router.post('/register', async (req, res) => {
  const { username, password, role = 'user' } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists!' });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        username: newUser.username,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Failed to register user', error);
    return res.status(500).send({ message: 'Failed to register user' });
  }
});

// Admin login
router.post('/admin', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Login attempt for username:', username);
    
    const admin = await User.findOne({ username });
    if (!admin) {
      console.log('Admin not found:', username);
      return res.status(404).send({ message: 'Admin not found!' });
    }
    
    console.log('Admin found, checking password...');
    console.log('Admin role:', admin.role);
    console.log('Incoming password:', password);
    console.log('Stored hashed password:', admin.password);
    
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log('Password valid:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', username);
      return res.status(401).send({ message: 'Invalid password!' });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Authentication successful',
      token: token,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Failed to login as admin', error);
    return res.status(500).send({ message: 'Failed to login as admin', error: error.message });
  }
});

// Debug endpoint - check if admin exists
router.get('/debug/check-admin', async (req, res) => {
  try {
    const admin = await User.findOne({ username: 'admin' });
    if (admin) {
      return res.status(200).json({
        exists: true,
        username: admin.username,
        role: admin.role,
        passwordHash: admin.password.substring(0, 20) + '...',
      });
    } else {
      return res.status(200).json({
        exists: false,
        message: 'Admin user does not exist',
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Reset admin user endpoint
router.post('/reset-admin', async (req, res) => {
  try {
    const { password = 'kasturi' } = req.body;
    
    // Delete existing admin first
    await User.deleteOne({ username: 'admin' });
    console.log('Deleted existing admin user');
    
    // Create new admin
    const newAdmin = new User({
      username: 'admin',
      password: password,
      role: 'admin'
    });
    
    await newAdmin.save();
    console.log('Created new admin user with password:', password);
    
    return res.status(200).json({
      message: 'Admin user reset successfully',
      username: 'admin',
      password: password,
      role: 'admin'
    });
  } catch (error) {
    console.error('Failed to reset admin', error);
    return res.status(500).json({ message: 'Failed to reset admin', error: error.message });
  }
});

module.exports = router;
