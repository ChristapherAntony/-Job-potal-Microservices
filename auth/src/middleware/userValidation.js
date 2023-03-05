const { body } = require('express-validator');

// Define validation rules for the signup endpoint
const validationSignup = [

    body('user_name')
        .notEmpty()
        .withMessage('Name is required')
        .trim()
        .escape(),

    body('phone_number')
        .isMobilePhone()
        .withMessage('Phone number is not valid')
        .trim()
        .escape(),

    body('email')
        .isEmail()
        .withMessage('Email is not valid')
        .normalizeEmail(),

    body('password')
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters long')
        .trim()
        .escape(),

    body('role')
        .notEmpty()
        .withMessage('Role is required')
        .custom(value => {
            if (!['candidate', 'admin', 'recruiter'].includes(value)) {
                throw new Error('Invalid role, must be candidate, admin, or recruiter');
            }
            return true;
        })
        .trim()
        .escape(),

];

// Define validation and sanitization rules for the signin endpoint
const validationSignIn = [
    body('email')
        .isEmail()
        .withMessage('Email is not valid')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 4 })
        .withMessage('Password must be at least 4 characters long')
        .trim()
        .escape(),
];


module.exports = { validationSignIn, validationSignup }