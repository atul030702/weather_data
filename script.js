const weather_img = document.getElementById("weather-img");
const loader = document.getElementById("loader");
const weatherBody = document.getElementById("weather-box");
const cityNameEl = document.getElementById("city-name");
const descriptionImgEl = document.getElementById("weather-description-image");
const temperatureEl = document.getElementById("temperature");
const weatherDescriptionEl = document.getElementById("description");
const aqiDetailEl = document.getElementById("aqi-detail");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("wind-speed");  
const errorCase = document.getElementById("error-case");
const suggestionList = document.getElementById("suggestions-list");
const lastUpdatedEl = document.getElementById("last-updated");

let selectedIndex = -1;

function updateUI(data) {
    const cityNameWrapper = document.createDocumentFragment();
    const cityName = data?.location?.name;
    cityNameWrapper.append(
        createNewImageElement("/assets/location.svg", "location-icon"),
        document.createTextNode(`${cityName}`)
    );
    cityNameEl.appendChild(cityNameWrapper);
    console.log(cityName);

    const weatherDescriptionImgWrapper = document.createDocumentFragment();
    const weatherImageFromCdn = data?.current?.condition?.icon;
    const weatherDescriptionImgTag = createNewImageElement(weatherImageFromCdn, "weather-description-image");
    weatherDescriptionImgTag.style.width = "100px";
    weatherDescriptionImgTag.style.height = "100px";
    weatherDescriptionImgWrapper.appendChild(weatherDescriptionImgTag);
    descriptionImgEl.appendChild(weatherDescriptionImgWrapper);

    const temperatureWrapper = document.createDocumentFragment();
    const tempCelsius = (data?.current?.heatindex_c ?? data?.current?.temp_c).toFixed(1);
    let tempImgTag;
        if(tempCelsius <= 16) {
            tempImgTag = createNewImageElement("/assets/temperature_low.svg", "cold-weather-temperature");
        }else if(tempCelsius > 16 && tempCelsius <= 30) {
            tempImgTag = createNewImageElement("/assets/normal_temperature.svg", "normal-weather-temperature");
        }else {
            tempImgTag = createNewImageElement("/assets/temperature_high.svg", "hot-weather-temperature");
        }
    temperatureWrapper.append(tempImgTag, document.createTextNode(`${tempCelsius}°C`));
    temperatureEl.appendChild(temperatureWrapper);

    const weatherDescriptionWrapper = document.createDocumentFragment();
    const isDay = data?.current?.is_day;
    const weatherDescription = data?.current?.condition?.text;
    weatherDescriptionWrapper.append(
        createNewImageElement(isDay === 1 ? "/assets/day.svg" : "/assets/night.svg", "day-night-icon"),
        document.createTextNode(`${weatherDescription}`)
    );
    weatherDescriptionEl.appendChild(weatherDescriptionWrapper);

    const aqiWrapper = document.createDocumentFragment();
    const aqiData = (data?.current?.air_quality?.pm2_5 ?? 0).toFixed(0);
    const aqiDescription = data?.current?.air_quality["us-epa-index"];
    let AQIImgTag;
    switch (aqiDescription) {
        case 1:
            AQIImgTag = createNewImageElement("/assets/aqi-good.svg", "good-aqi");
        break;
        case 2: 
            AQIImgTag = createNewImageElement("/assets/aqi-good.svg", "fair-aqi");
            break;
        case 3:
            AQIImgTag = createNewImageElement("/assets/aqi-moderate.svg", "moderate-aqi");
            break;
        case 4:
            AQIImgTag = createNewImageElement("/assets/aqi-unhealthy.svg", "unhealthy-aqi");
            break;
        case 5: 
            AQIImgTag = createNewImageElement("/assets/aqi-alert.svg", "health-alert");
            break;
        case 6: 
            AQIImgTag = createNewImageElement("/assets/aqi-hazardous.svg", "hazardous-aqi");
            break;
        default: 
            aqiDetailEl.textContent = ""; 
            break;
    };
    aqiWrapper.append(
        AQIImgTag, 
        document.createTextNode(`: ${aqiData} ( PM2.5 )`)
    );
    aqiDetailEl.classList.add("show");
    aqiDetailEl.appendChild(aqiWrapper);

    const humidityWrapper = document.createDocumentFragment();
    const humidityValue = (data?.current?.humidity);
    humidityWrapper.append(
        createNewImageElement("/assets/humidity_percentage.svg", "humidity-icon"), 
        document.createTextNode(`${humidityValue}%`),
        document.createElement("br"),
        document.createTextNode(`Humidity`)
    );
    humidityEl.appendChild(humidityWrapper);

    const windSpeedWrapper = document.createDocumentFragment();
    const windSpeed = (data?.current?.wind_kph).toFixed(1);
    windSpeedWrapper.append(
        createNewImageElement("/assets/windy.svg", "wind-icon"),
        document.createTextNode(`${windSpeed} Km/Hr`),
        document.createElement("br"),
        document.createTextNode(`Wind Speed`)
    );
    windSpeedEl.append(windSpeedWrapper);

    const lastUpdatedWrapper = document.createDocumentFragment();
    const lastUpdatedTime = data?.current?.last_updated;
    const timeOnly = lastUpdatedTime.split(" ")[1];
    lastUpdatedWrapper.appendChild(document.createTextNode(`Last Updated at: ${timeOnly}(local-time)`));
    lastUpdatedEl.appendChild(lastUpdatedWrapper);
}

const preloadAssetImages = () => {
    const assets = [
      '/assets/404.svg',
      '/assets/location.svg',
      '/assets/temperature_low.svg',
      '/assets/normal_temperature.svg',
      '/assets/temperature_high.svg',
      '/assets/aqi-good.svg',
      '/assets/aqi-moderate.svg',
      '/assets/aqi-unhealthy.svg',
      '/assets/aqi-alert.svg',
      '/assets/aqi-hazardous.svg',
      '/assets/humidity_percentage.svg',
      '/assets/windy.svg',
      '/assets/day.svg',
      '/assets/night.svg'
    ];
    assets.forEach(src => new Image().src = src);
};

function updateTimeInfo() {
    const timeInfoDiv = document.getElementById("time-information");

    const date = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: "true",
    }
    timeInfoDiv.textContent = date.toLocaleDateString([], options).replace(" at ", "  ");
}

function createNewImageElement(src, alt) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    return img;
}

function clearWeatherDetails() {
    [temperatureEl, weatherDescriptionEl, humidityEl, windSpeedEl, cityNameEl, aqiDetailEl, descriptionImgEl, lastUpdatedEl].forEach(
        (el) => {if(el) el.textContent = "";

    });
    if (weather_img) weather_img.style.display = "none";
    aqiDetailEl.classList.remove("show");
}

function handleErrorCase(error) {
    if(errorCase) errorCase.innerHTML = "";
    aqiDetailEl.style.display = "none";
    weatherBody.style.display = "none";
    
    const errorWrapper = document.createDocumentFragment();
    const errorImg = createNewImageElement("/assets/404.svg", "error-image");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = error.message || "An unexpected error occurred. Please try again.";

    errorWrapper.append(errorImg, errorMessage);
    errorCase.appendChild(errorWrapper);
    loader.style.display = "none";
    errorCase.style.display = "block";
}

async function fetchWeatherData(query) {
    loader.style.display = "block";
    aqiDetailEl.style.display = "flex";
    weatherBody.style.display = "none";

    try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error("City not found. Please check the city name and try again.");
        }

        const weatherData = await response.json();

        clearWeatherDetails();
        if(errorCase) errorCase.innerHTML = "";
        updateUI(weatherData);

        loader.style.display = "none";
        weather_img.style.display = "none";
        weatherBody.classList.add("show");
        weatherBody.style.display = "block";
    } catch (error) {
        handleErrorCase(error);
    } finally {
        loader.style.display = "none";
    }
}

async function getUserLocation() {  
    const locationDiv = document.getElementById("location-btnDiv");
    const geoLocation = navigator.geolocation.getCurrentPosition(
        async(position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(`${lat}, ${lon}`);
            locationDiv.classList.add("remove");
        }, 
        (error) => {
            locationDiv.classList.add("remove");
            console.error(error.message);
        }
    );
}

async function checkWeather(city) {
    if(city.trim()) {
        fetchWeatherData(city);
    }else{
        handleErrorCase(new Error("City name is required. Please provide a valid city name."));
    }
}

async function fetchCityNameSuggestions(query) {
    try{
        const response = await fetch(`/api/suggestions?query=${encodeURIComponent(query)}`);
        if(!response.ok) throw new Error("Failed to fetch city suggestions.");
        return await response.json();
    }catch(error) {
        console.error(error);
        return [];
    }
}
function showSuggestions(cities) {
    suggestionList.textContent = "";
    suggestionList.style.display = "block";
    selectedIndex = -1;

    cities.forEach((city) => {
        const li = document.createElement("li");
        const region = city?.state || city?.country;
        li.textContent = `${city?.name}, ${region}`;
        li.classList.add("autocomplete-item");

        suggestionList.appendChild(li);
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const inputBox = document.getElementById("city-input");

    preloadAssetImages();
    updateTimeInfo(); 
    let timeInterval = setInterval(updateTimeInfo, 60000);

    const handleInput = async (event) => {
        const inputField = event.target.closest('#city-input');
        let fetchTimeout;
        if(inputField) {
            const query = event.target.value.trim();
            if(fetchTimeout) clearTimeout(fetchTimeout);
            if(query.length < 2) {
                suggestionList.textContent = "";
                suggestionList.style.display = "none";
                selectedIndex = -1;
                return;
            }
            fetchTimeout = setTimeout(async () => {
                const cities = await fetchCityNameSuggestions(query);
                if(inputBox.value.trim().length < 2) {
                    suggestionList.textContent = "";
                    suggestionList.style.display = "none";
                    return
                }else{
                    showSuggestions(cities);
                }
            }, 300);
        }
    };

    const handleClick = (event) => {
        const searchBtn = event.target.closest("#searchButton");
        const locationDiv = event.target.closest("#location-btnDiv");
        const li = event.target.closest(".autocomplete-item");
        
        if(searchBtn) {
            const city = inputBox.value.trim();

            if(city) {
                checkWeather(city);
                inputBox.value = "";
                inputBox.style.setProperty("--placeholder-color", "");
                suggestionList.textContent = "";
                suggestionList.style.display = "none";
                selectedIndex = -1;
            }else{
                const placeholder = "Enter a valid city name";
                inputBox.placeholder = placeholder;
                inputBox.style.setProperty("--placeholder-color", "red");
            }
        }else if(locationDiv) {
            getUserLocation();

        }else if(li) {
            inputBox.value = li.textContent;
            suggestionList.textContent = "";
            suggestionList.style.display = "none";
            selectedIndex = -1;
        }
    };

    const handleKeyDown = (event) => {
        const items = document.querySelectorAll(".autocomplete-item");

        if(items.length === 0) return;

        if(event.key === "ArrowDown") {
            selectedIndex = (selectedIndex + 1) % items.length;
        }else if(event.key === "ArrowUp") {
            selectedIndex = (selectedIndex - 1) % items.length;
        }else if(event.key === "Enter" && selectedIndex >= 0) {
            event.preventDefault();
            inputBox.value = items[selectedIndex].textContent;
            suggestionList.textContent = "";
            suggestionList.style.display = "none";
            selectedIndex = -1;

            checkWeather(inputBox.value.trim());
            inputBox.value = "";
        }

        items.forEach((items, index) => {
            items.classList.toggle("selected", index === selectedIndex);
        })
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('input', handleInput);
    document.addEventListener('keydown', handleKeyDown);

    document.addEventListener('visibilitychange', () => {
        if(document.hidden) {
            clearInterval(timeInterval);
        }else {
            if(timeInterval) clearInterval(timeInterval);
            updateTimeInfo();
            timeInterval = setInterval(updateTimeInfo, 60000);
        }
    });
    
    window.addEventListener('beforeunload', () => {
        clearInterval(timeInterval);
        document.removeEventListener('click', handleClick);
        document.removeEventListener('input', handleInput);
        document.addEventListener('keydown', handleKeyDown);
    });
});