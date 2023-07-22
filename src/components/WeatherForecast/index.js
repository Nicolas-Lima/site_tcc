import "./weatherForecast.css";

function WeatherForecast({ weatherData }) {
  const weatherIcon = weatherData?.weather[0]?.icon;

  return (
    <div>
      <article className="shadow-lg">
        <header className="text-center mb-5 d-flex justify-content-center align-items-center">
          <strong className="me-3">Previsão do clima</strong>
          {weatherIcon && (
            <img
              src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
              className="weatherIcon rounded shadow-sm"
              alt="Current weather icon"
              width={50}
              height={50}
            />
          )}
        </header>
        <div className="text-center">
          <span className="d-block text-dark">
            Temperatura: {weatherData.main.temp}
          </span>
          <span className="d-block text-dark">
            Sensação térmica: {weatherData.main.feels_like}
          </span>
        </div>
      </article>
    </div>
  );
}

export default WeatherForecast;
