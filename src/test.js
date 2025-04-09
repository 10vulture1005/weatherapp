import axios from 'axios';
// Configuration
const API_KEY = '83ca178d2434828b152288a78ec212c5';
const TEST_LAT = 51.5074;  // London latitude
const TEST_LON = -0.1278;  // London longitude

// Test function
async function testWeatherApi() {
  try {
    console.log('Testing OpenWeather API...');
    const link = `https://api.openweathermap.org/data/2.5/weather?lat=${TEST_LON}&lon=${TEST_LAT}&appid=${API_KEY}`
    const response = await axios.get(link, {
      params: {
        lat: TEST_LAT,
        lon: TEST_LON,
        units: 'metric',
        appid: API_KEY
      },
      timeout: 100000
    });
    
    console.log('✅ Success! API key is valid');
    console.log(`City: ${response.data.name}`);
    console.log(`Weather: ${response.data.weather[0].main} (${response.data.weather[0].description})`);
    console.log(`Temperature: ${response.data.main.temp}°C`);
    
    return response.data;
  } catch (error) {
    console.log('❌ API test failed');
    if (error.response) {
      console.log(`Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
    } else {
      console.log(`Error: ${error.message}`);
    }
  }
}

// Run the test
testWeatherApi();