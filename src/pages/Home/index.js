import { useEffect, useState, useContext } from "react";
import DrawerAndNav from "../../components/DrawerAndNav";
import NewIrrigation from "../../components/NewIrrigation";
import { fetchWeatherData } from "../../services/weatherApi";
import { AuthContext } from "../../contexts/auth";

function Home() {
  const [weatherData, setWeatherData] = useState({});
  const { user, logout } = useContext(AuthContext);

  const getWeatherData = async () => {
    const weatherData = await fetchWeatherData();
    setWeatherData(weatherData);
    return weatherData;
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div>
      <DrawerAndNav />
      <div className="container py-0 mt-5 mt-md-3 mt-lg-4">
        <div className="row justify-content-center gx-sm-5 mb-4">
          {/* O U T R O */}
          
          {weatherData.main && (
            <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4">
              <article className="shadow-lg">
                <header className="text-center mb-5 d-flex justify-content-center">
                  <span className="me-3">Clima atual</span>
                </header>
                <span className="d-block text-dark">
                  Temperatura: {weatherData.main.temp}
                </span>
                <span className="d-block text-dark">
                  Sensação térmica: {weatherData.main.feels_like}
                </span>
              </article>
            </div>
          )}

          {/* O U T R O */}
        </div>
      </div>
    </div>
  );
}

export default Home;
