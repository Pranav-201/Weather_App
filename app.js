const express = require("express");
const axios = require("axios");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = 3000;
const apiKey = process.env.WEATHER_API;


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;
  const apiKey = process.env.WEATHER_API;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const weatherData = response.data;

    // Pass weather data to EJS
    res.render("weather", { weather: weatherData, error: null });
  } catch (error) {
    // If city not found or other error, show custom message
    res.render("weather", { weather: null, error: "City not found. Try again!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
