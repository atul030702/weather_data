export default async function handler(req, res) {
    const { query } = req.query;

    if(!query) {
        return res.status(400).json({error: "Quey parameter is required"});
    }

    const API_KEY = process.env.GEO_API_KEY;
    if(!API_KEY) {
        return res.status(500).json({error: "API Key is missing"});
    }

    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`;

    try {
        const response = await fetch(API_URL);

        if(!response.ok) {
            throw new Error(`OpenWeather API request failed ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({error: "Failed to fetch weather data"});
    }
}