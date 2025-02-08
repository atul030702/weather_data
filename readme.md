# Sky Cast - Weather App

[![Website](https://img.shields.io/website?down_message=offline&label=Sky%20Cast&up_message=online&url=https%3A%2F%2Fsky-cast-coral.vercel.app%2F)](https://sky-cast-coral.vercel.app/)

## 🌦️ Overview
Sky Cast is a serverless weather application that provides real-time weather information based on user input. It utilizes the WeatherAPI for weather data and OpenWeather API for location suggestions and dynamically updates the UI based on live response.

## 🚀 Live Demo
[Sky Cast - Live](https://sky-cast-coral.vercel.app/)

## 🔧 Features
- **🌍 Search Weather by City**: Fetches current weather conditions for a given city.
- **📌 Use My Location**: Fetch current weather data for user's location.
- **🌡️ Temperature & Weather Info**: Provides air quality index (AQI), humidity, wind speed, and temperature.
- **🔍 Auto-Suggest Cities**: Suggests city names while typing using OpenWeather API.
- **🌐 API Details**: Uses a serverless function on Vercel to securely fetch weather data.
- **⏰ Last Updated Time**: Shows last updated time, when the data was last refreshed.
- **❌ Error Handling**: Displays user-friendly messages for invalid city names or failed api requests.

## 🛠️ Tech-Stack Used
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Backend**: Node.js (Serverless API on Vercel)
- **APIs**: WeatherAPI, OpenWeather API
- **Deployment**: Vercel

## 📂 Project Structure
Sky-Cast/  
│-- api/
│   │-- weather.js  # Serverless function to fetch weather data
│   │-- suggestions.js  # Serverless function to fetch city suggestions
│-- assets/  # Contains images and icons
│-- index.html  # Main HTML file
│-- README.md  # Project documentation
│-- style.css # Main CSS file
│-- script.js  # Handles frontend logic 

## 📧 Contact
For any questions or feedback, feel free to reach out via email: singhatul0307@gmail.com or GitHub discussions.

---

### 🚀 Next Steps
- Add weekly weather forecast feature  
- Improve performance with caching   
- Add dark mode support 

