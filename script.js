const apiKey = '6913f70b8c76b67efe227d3fd5a4a770';
const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

// Function to fetch weather data from the API
async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to process JSON data and return relevant weather information
function processWeatherData(data) {
  return {
    city: data.name,
    temperature: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}

// Function to display weather information on the webpage
function displayWeatherInfo(weather) {
  weatherInfo.innerHTML = `
    <h2>${weather.city}</h2>
    <p>${weather.temperature}°C</p>
    <p>${weather.description}</p>
    <img src="http://openweathermap.org/img/w/${weather.icon}.png" alt="Weather Icon">
  `;
}

// Event listener for form submission
weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const location = locationInput.value.trim();
  if (location !== '') {
    try {
      const weatherData = await getWeatherData(location);
      const processedWeather = processWeatherData(weatherData);
      displayWeatherInfo(processedWeather);
    } catch (error) {
      console.error('Error processing weather data:', error);
    }
  }
});async function getWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('City not found. Please check the location and try again.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return null;
  }
}
function displayErrorMessage(message) {
  weatherInfo.innerHTML = `<p class="error-message">${message}</p>`;
}
function displayWeatherInfo(weather) {
  weatherInfo.innerHTML = `
    <h2>${weather.city}</h2>
    <p>${weather.temperature}°C</p>
    <p>${weather.description}</p>
    <img src="http://openweathermap.org/img/w/${weather.icon}.png" alt="Weather Icon">
  `;
}