import { useEffect, useState, useContext } from "react";

import DrawerAndNav from "../../components/DrawerAndNav";
import Container from "../../components/Container";
import Row from "../../components/Row";
import WeatherForecast from "../../components/WeatherForecast";

import { fetchWeatherData } from "../../services/weatherApi";
import { AuthContext } from "../../contexts/auth";

function Home() {
  const [weatherData, setWeatherData] = useState({});
  const { user } = useContext(AuthContext);

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
      <Container>
        <Row className="justify-content-center gx-sm-5">
          {/* O U T R O */}

          {/* <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4"> */}
          <WeatherForecast weatherData={weatherData} />

          {/* O U T R O */}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
