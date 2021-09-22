//comment
import express from 'express';
import connectDatabase from './config/db';
<<<<<<< HEAD
import { check, validationResult } from 'express-validator';
=======
import { check, validationResult, ValidationResult } from 'express-validator';
>>>>>>> 36e055cfd4e3664c6a573bae4cfa2ac522a57e51

// Initialize express application
const app = express();

// Connect database
connectDatabase();

//Configure Middleware
app.use(express.json({extended: false}));

// API endpoints
/**
 * @route Get /
 * @desc Test endpoint
 * */
app.get('/', (req, res) =>
  res.send('http get request sent to root api endpoint')
);

/**
 * @route Post api/users
 * @desc Register user
 */
n
app.post('/api/users', 
[
check('name', 'Please enter your name').not().isEmpty(),
check('email', 'Please enter a valid email').isEmail(),
check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
],
(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()});
  } else {
    return res.send(req.body);
  }
}
);

// Connection listener
app.listen(3000, () => console.log(`Express server running on port 3000`));