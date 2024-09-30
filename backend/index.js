const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors=require('cors')
require('dotenv').config();

const app=express()
const PORT=process.env.PORT || 4000

app.use(express.json())
app.use(bodyParser.json())
app.use(cors(
  {
    origin:["https://project-2whq.vercel.app"],
    methods:["POST","GET"],
    credentials:true
))

const bookingSchema = new mongoose.Schema({
  bikeType: String,
  name: String,
  mobile: String,
  location: String,
});

const Booking = mongoose.model("Booking", bookingSchema);


const dealerSchema = new mongoose.Schema({
  name: String,
  address: String,
  city: String,
  district: String,
  state: String,
});

// Create Dealer model
const Dealer = mongoose.model('Dealer', dealerSchema);


// API Endpoint to handle bookings
app.post("/api/bookings", async (req, res) => {
  const { bikeType, name, mobile, location } = req.body;

  try {
      const newBooking = new Booking({ bikeType, name, mobile, location });
      await newBooking.save();
      res.status(201).json({ message: "Booking created successfully!" });
  } catch (error) {
      res.status(500).json({ message: "Error creating booking", error });
  }
});

app.post('/api/dealers', async (req, res) => {
  const { city, district, state } = req.body;

  try {
      const dealers = await Dealer.find({ city, district, state });
      res.json(dealers);
  } catch (error) {
      console.error("Error fetching dealers:", error);
      res.status(500).json({ message: "Error fetching dealer data." });
  }
});
  
  mongoose.connect(process.env.MONGO_URI,{connectTimeoutMS: 30000,socketTimeoutMS: 45000,})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
