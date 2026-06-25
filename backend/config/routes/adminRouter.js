const express = require('express');
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getDashboard,
} = require('../controllers/adminController');

const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/profile/:id', getAdminProfile);
router.get('/dashboard', getDashboard);

module.exports = router;
