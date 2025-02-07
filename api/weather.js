export default async function handler(req, res) {
    const { city } = req.query;

    if(!city) {
        return res.status(400).json({error: "City parameter is required"});
    }

    const API_KEY = process.env.WEATHER_API_KEY;

    if(!API_KEY) {
        return res.status(500).json({error: "API Key is missing"});
    }

    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;

    try {
        const response = await fetch(API_URL);

        if(!response.ok) {
            throw new Error(`Failed to fetch weather data ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({error: error.message || "Failed to fetch weather data"});
    }
}