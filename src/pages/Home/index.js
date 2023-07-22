import { useEffect, useState, useContext } from "react";

import DrawerAndNav from "../../components/DrawerAndNav";
import ScheduleIrrigation from "../../components/ScheduleIrrigation";
import Container from "../../components/Container";
import Row from "../../components/Row";

import { fetchWeatherData } from "../../services/weatherApi";
import { AuthContext } from "../../contexts/auth";

function Home() {
  const [weatherData, setWeatherData] = useState({});
  const [aa, setAa] = useState("");

  const { user } = useContext(AuthContext);

  const getWeatherData = async () => {
    const weatherData = await fetchWeatherData();
    setWeatherData(weatherData);
    return weatherData;
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  if (aa == "NewIrrigation") {
    return <ScheduleIrrigation />;
  }

  return (
    <div>
      <DrawerAndNav />
      <Container>
        <Row className="justify-content-center gx-sm-5">
          {/* O U T R O */}

          {/* <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4"> */}
          {weatherData.main && (
            <div>
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
        </Row>
      </Container>
    </div>
  );
}

export default Home;
