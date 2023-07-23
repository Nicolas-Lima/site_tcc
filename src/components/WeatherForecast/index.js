import { capitalizeFirstLetter } from "../../utils/generalUtils";
import {
  BsThermometerHigh,
  BsThermometerHalf,
  BsThermometerLow,
  BsWind,
} from "react-icons/bs";

import "./weatherForecast.css";

function WeatherForecast({ weatherData }) {
  if (!weatherData) {
    return;
  }

  const getTempIcon = temperature => {
    if (temperature <= 10) {
      return <BsThermometerLow />;
    } else if (temperature >= 11 && temperature <= 25) {
      return <BsThermometerHalf />;
    } else if (temperature >= 26) {
      return <BsThermometerHigh />;
    }
  };

  const thermalSensation = parseInt(weatherData.main.feels_like);
  const temperature = parseInt(weatherData.main.temp);
  const weatherCondition = capitalizeFirstLetter(
    weatherData.weather[0].description
  );
  const windSpeed = weatherData.wind.speed;

  const weatherIconId = weatherData?.weather[0]?.icon;
  const tempIcon = getTempIcon(temperature);
  const thermalSensationIcon = getTempIcon(thermalSensation);

  alert("CRIAR COMPONENTES E tirar coisas DUPLICADAS, como a IMG!");

  return (
    <div className="weatherForecast-container">
      <article className="shadow-lg pb-5">
        <header className="text-center mb-5 d-flex justify-content-center align-items-center">
          <strong className="me-3">Previsão do clima</strong>
          {weatherIconId && (
            <img
              src={`http://openweathermap.org/img/wn/${weatherIconId}.png`}
              className="weatherIcon rounded shadow-sm"
              alt="Current weather icon"
              width={50}
              height={50}
            />
          )}
        </header>
        <div className="text-center px-1 px-sm-3 px-md-4">
          <div className="d-block border border-light shadow-sm text-dark rounded">
            <i className="icon">{tempIcon}</i>
            <p className="ms-3 text-dark">
              <span className="custom-color">Temperatura:</span>{" "}
              {temperature}°
            </p>
          </div>
          <div className="d-block border border-light shadow-sm text-dark rounded">
            <i className="icon">{thermalSensationIcon}</i>
            <p className="ms-3 text-dark">
              <span className="custom-color">Sensação térmica:</span>{" "}
              {thermalSensation}°
            </p>
          </div>
          <div className="d-block border border-light shadow-sm text-dark rounded">
            <img
              className="bg-gray rounded"
              src={`http://openweathermap.org/img/wn/${weatherIconId}.png`}
              alt="Current weather icon"
              width={35}
              height={35}
            />
            <p className="ms-3 text-dark">
              <span className="custom-color">Condição climática:</span>{" "}
              {weatherCondition}
            </p>
          </div>
          <div className="d-block border border-light shadow-sm text-dark rounded">
            <i className="icon">
              <BsWind />
            </i>
            <p className="ms-3 text-dark">
              <span className="custom-color">Velocidade do vento:</span>{" "}
              {windSpeed}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}

export default WeatherForecast;
