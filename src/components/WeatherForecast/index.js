import {
  capitalizeFirstLetter,
  mpsToKmph,
  roundToNearestInteger,
  getTempIcon,
} from "../../utils/generalUtils";
import WeatherCard from "../WeatherCard";
import { BsWind } from "react-icons/bs";

import "./weatherForecast.css";

function WeatherForecast({ weatherData }) {
  if (!weatherData || !weatherData.main) {
    return;
  }

  const thermalSensation = parseInt(weatherData.main.feels_like);
  const temperature = parseInt(weatherData.main.temp);
  const weatherCondition = capitalizeFirstLetter(
    weatherData.weather[0].description
  );
  const windSpeed = roundToNearestInteger(
    mpsToKmph(weatherData.wind.speed)
  );

  const weatherIconId = weatherData?.weather[0]?.icon;
  const weatherIconUrl = `http://openweathermap.org/img/wn/${weatherIconId}.png`;
  const tempIcon = getTempIcon(temperature);
  const thermalSensationIcon = getTempIcon(thermalSensation);

  return (
    <div className="weatherForecast-container">
      <article className="shadow-lg pb-5 mt-1">
        <header className="text-center mb-5 d-flex justify-content-center align-items-center">
          <strong className="me-3">Previsão do tempo</strong>
          {weatherIconId && (
            <img
              src={weatherIconUrl}
              className="weatherIcon rounded shadow-sm"
              alt="Current weather icon"
              width={50}
              height={50}
            />
          )}
        </header>
        <div className="text-center px-1 px-sm-3 px-md-4">
          <WeatherCard
            key="temperature"
            icon={tempIcon}
            label="Temperatura"
            data={temperature}
            unit="°"
          />
          <WeatherCard
            key="thermalSensation"
            icon={thermalSensationIcon}
            label="Sensação térmica"
            data={thermalSensation}
            unit="°"
          />
          <WeatherCard
            key="weatherCondition"
            iconUrl={weatherIconUrl}
            label="Condição climática"
            data={weatherCondition}
          />
          <WeatherCard
            key="windSpeed"
            icon={<BsWind />}
            label="Velocidade do vento"
            data={windSpeed}
            unit="km/h"
          />
        </div>
      </article>
    </div>
  );
}

export default WeatherForecast;
