import axios from 'axios';

const API_KEY = '895284fb2d2c50a520ea537456963d9c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (location) => {
  try {
    const url = `${BASE_URL}?q=${location}&units=imperial&appid=${API_KEY}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
