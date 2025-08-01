const API_KEY = '3dce9b1c66837262a25b3f448d354a76';
export const fetchWeatherData = async () => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Israel&units=metric&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};