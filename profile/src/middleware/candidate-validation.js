const { body, validationResult, sanitizeBody } = require('express-validator');

const validateProfileQuickUpdate = [
    body('user_name').notEmpty().withMessage('Username is required.').trim().escape(),
    body('email').isEmail().withMessage('Email is invalid.').trim().escape(),
    body('phone_number').isMobilePhone().withMessage('Phone number is invalid.').trim().escape(),
    body('about').notEmpty().withMessage('About section is required.').trim().escape(),
    body('bio').notEmpty().withMessage('Bio section is required.').trim().escape(),
    body('key_skills').notEmpty().withMessage('Key skills must be required.').trim().escape(),
    body('profile_image').notEmpty().withMessage('Profile image is required.'),
    body('curriculum_vitae').notEmpty().withMessage('Curriculum vitae is required.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

const validatePersonalInfo = [
    body('user_name').trim().isLength({ min: 1 }).withMessage('User name is required'),
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('phone_number').trim().isLength({ min: 10, max: 10 }).withMessage('Phone number must be 10 digits'),
    body('date_of_birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('gender').optional({ checkFalsy: true }).isIn(['male', 'female', 'other']).withMessage('Invalid gender , should be male, female, other'),
    body('current_location').optional({ checkFalsy: true }).trim(),
    body('house_no').trim().isLength({ min: 1 }).withMessage('House no is required'),
    body('street').trim().isLength({ min: 1 }).withMessage('Street is required'),
    body('city').trim().isLength({ min: 1 }).withMessage('City is required'),
    body('state').trim().isLength({ min: 1 }).withMessage('State is required'),
    body('country').trim().isLength({ min: 1 }).withMessage('Country is required'),
    body('pin_code').trim().isLength({ min: 1 }).withMessage('Pin code is required').isNumeric().withMessage('Pin code must be numeric'),
    sanitizeBody('*').trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

const validateExperience = [
    sanitizeBody('*').trim().escape(),
    body('designation')
        .notEmpty().withMessage('Designation is required'),
    body('company_name')
        .notEmpty().withMessage('Company name is required'),
    body('current_status')
        .notEmpty().withMessage('Current status is required'),
    body('start_date')
        .notEmpty().withMessage('Start date is required')
        .isISO8601().withMessage('Invalid start date format'),
    body('end_date')
        .optional({ nullable: true })
        .isISO8601().withMessage('Invalid end date format'),
    body('notice_period')
        .optional({ nullable: true }),

    body('annual_salary')
        .notEmpty().withMessage('Annual salary is required')
        .isDecimal().withMessage('Annual salary must be a decimal number'),
    body('job_description')
        .notEmpty().withMessage('Job description is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

const validateEducation = [
    // sanitizeBody('*').trim().escape(),
    body('qualification')
        .notEmpty().withMessage('Qualification is required'),
    body('specialization')
        .notEmpty().withMessage('Specialization is required'),
    body('institute')
        .notEmpty().withMessage('Institute is required'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];


module.exports = { validateProfileQuickUpdate, validatePersonalInfo,validateExperience,validateEducation };
