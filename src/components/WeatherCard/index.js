import "./weatherCard.css";

function WeatherCard({ icon, iconUrl, label, data, unit = "" }) {
  return (
    <div className="d-block border border-light shadow-sm text-dark rounded">
      {iconUrl ? (
        <img
          className="bg-gray rounded"
          src={iconUrl}
          alt="Current weather icon"
          width={35}
          height={35}
        />
      ) : (
        <i className="icon">{icon}</i>
      )}
      <p className="ms-3 text-dark">
        <span className="custom-color">{label}:</span>
        {" " + data}
        <span>{unit}</span>
      </p>
    </div>
  );
}

export default WeatherCard;
