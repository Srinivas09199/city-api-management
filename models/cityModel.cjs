const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/city-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Define City Schema
const citySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  population: { type: Number, required: true },
  country: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});


// Create City Model
const City = mongoose.model('City', citySchema);

const getAllCities = async () => await City.find();
const addCity = async (city) => await City.create(city);
const updateCity = async (id, updatedCity) => await City.findByIdAndUpdate(id, updatedCity, { new: true });
const deleteCity = async (id) => await City.findByIdAndDelete(id);
const findCityByName = async (name) => await City.findOne({name});

module.exports = {
  getAllCities,
  addCity,
  updateCity,
  deleteCity,
  findCityByName,
};