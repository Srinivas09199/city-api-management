const cityModel = require('../models/cityModel.cjs');

// Add City API
const addCity = async (req, res) => {
  const { name, population, country, latitude, longitude } = req.body;

  try {
    const existingCity = await cityModel.findCityByName(name);
    if (existingCity) {
      return res.status(400).json({ error: 'City name must be unique' });
    }

    const newCity = { name, population, country, latitude, longitude };
    await cityModel.addCity(newCity);

    res.status(201).json({ message: 'City added successfully', city: newCity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add city', details: error.message });
  }
};

// Update City API
const updateCity = async (req, res) => {
  const id = req.params.id;
  const { name, population, country, latitude, longitude } = req.body;

  try {
    const updatedCity = await cityModel.updateCity(id, { name, population, country, latitude, longitude });
    if (!updatedCity) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.json({ message: 'City updated successfully', city: updatedCity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update city', details: error.message });
  }
};

// Delete City API
const deleteCity = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCity = await cityModel.deleteCity(id);
    if (!deletedCity) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.json({ message: 'City deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city', details: error.message });
  }
};

// Get Cities API
const getCities = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  try {
    let cities = await cityModel.getAllCities();

    // Apply searching
    if (search) {
      cities = cities.filter(city =>
        city.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCities = cities.slice(startIndex, endIndex);

    res.json(paginatedCities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve cities', details: error.message });
  }
};

module.exports = {
  addCity,
  updateCity,
  deleteCity,
  getCities,
};