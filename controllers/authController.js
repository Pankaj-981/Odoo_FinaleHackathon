import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

let otpStore = {}; // temporary storage

// 1️⃣ Register -> send OTP
export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { 
      otp, 
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes
      userData: { name, email, phone, password } 
    };

    // Send OTP via Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { 
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS 
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}`
    });

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Error processing registration" });
  }
};

// 2️⃣ Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpStore[email];
    
    if (!record) return res.status(400).json({ message: "No OTP found" });
    if (record.expires < Date.now()) return res.status(400).json({ message: "OTP expired" });
    if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    const { name, phone, password } = record.userData;
    const hashed = await bcrypt.hash(password, 10);
    
    // Create user in MySQL
    await User.create({ 
      name, 
      email, 
      phone, 
      password: hashed, 
      isVerified: true 
    });

    delete otpStore[email];
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};

// 3️⃣ Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    
    // Check if verified
    if (!user.isVerified) {
      return res.status(400).json({ message: "Account not verified" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { 
      expiresIn: "1h" 
    });
    
    // Return user data (excluding password)
    const { password: _, ...userData } = user.get({ plain: true });
    res.json({ token, user: userData });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Error during login" });
  }
};
