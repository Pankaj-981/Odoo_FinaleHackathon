import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import sequelize from './config/database.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connection has been established successfully.');
    
    // Sync all models
    await sequelize.sync();
    console.log('✅ Database synchronized');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
};

testConnection();

// Routes
app.use('/api/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);  
  console.log(`🌐 http://localhost:${PORT}`);
});
