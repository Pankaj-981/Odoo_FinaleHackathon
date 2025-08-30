import sequelize from './database.js';
import User from '../models/user.js';

const initDB = async () => {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');

    // Sync all models
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
    
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

initDB();
