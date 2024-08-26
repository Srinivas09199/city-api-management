const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController.cjs');

// Define routes
router.post('/add', cityController.addCity);
router.put('/update/:id', cityController.updateCity);
router.delete('/delete/:id', cityController.deleteCity);
router.get('/', cityController.getCities);

module.exports = router;