import axios from "axios"

const weatherApi = axios.create({
    baseURL: "https://api.openweathermap.org/data/2.5/"
})

const fetchWeatherData = async(weatherCity="Cataguases", weatherCountry="Brazil") => {
    return new Promise((resolve, reject) => {
        weatherApi
          .get("weather", {
            params: {
              q: `${weatherCity},${weatherCountry}`,
              appid: "033ab76577822de6ff527b496b84659f",
              units: "metric",
              lang: "pt_br",
            },
          })
          .then(response => {
            const responseData = response.data;

            const weatherData = {
              main: responseData.main,
              weather: responseData.weather,
              wind: responseData.wind,
            };
            resolve(weatherData);
          })
          .catch(error => {
            reject(error);
          });
    })
}

export { weatherApi, fetchWeatherData }