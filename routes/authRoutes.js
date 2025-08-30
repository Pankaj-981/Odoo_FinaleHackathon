import express from 'express';
import { body } from 'express-validator';
import { registerUser, verifyOtp, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Input validation middleware
const validateRequest = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));
    
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors: errors.array() 
    });
  };
};

// Register route with validation
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('phone').optional().isMobilePhone().withMessage('Please enter a valid phone number'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  validateRequest,
  registerUser
);

// Verify OTP route with validation
router.post(
  '/verify-otp',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits')
  ],
  validateRequest,
  verifyOtp
);

// Login route with validation
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').exists().withMessage('Password is required')
  ],
  validateRequest,
  loginUser
);

export default router;
