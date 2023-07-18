import { useEffect, useState } from "react";
import DrawerAndNav from "../../components/DrawerAndNav";
import { fetchWeatherData } from "../../services/weatherApi";

// alert("UseContext")
// alert("<Private> </Private>")
// alert("Dividir em componentes")

function Home() {
  const [weatherData, setWeatherData] = useState({});

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

        <div className="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
            <article className="shadow-lg pt-0">
              <header className="text-center mb-4 d-flex justify-content-center">
                <strong className="me-3">Agendar nova irrigação</strong>
              </header>
              <form className="mb-0">
                <div className="d-flex flex-column mb-4">
                  <label className="mb-2" htmlFor="firstname">Nome</label>
                  <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    placeholder="Nome do agendamento"
                    required
                  />

                  <label className="mb-2" htmlFor="lastname">Data</label>
                  <input
                    type="date"
                    id="lastname"
                    name="lastname"
                    placeholder="Last name"
                    required
                  />

                  <label className="mb-2" htmlFor="lastname">Hora</label>
                  <input
                    type="time"
                    id="lastname"
                    name="lastname"
                    placeholder="Last name"
                    required
                  />
                </div>

                <button type="submit">Agendar</button>
              </form>
            </article>
        </div>

          {/* O U T R O */}

          <div className="col-sm-12 col-md-6 col-lg-5 col-xl-4">
            <article className="shadow-lg">
              <header className="text-center mb-5 d-flex justify-content-center">
                <span className="me-3">Clima atual</span>
              </header>
              <span className="d-block text-dark">
                Temperatura: {weatherData?.main?.temp} 
              </span>
              <span className="d-block text-dark">
                Sensação térmica: {weatherData?.main?.feels_like}
              </span>
            </article>
          </div>

          {/* O U T R O */}
        </div>
      </div>
    </div>
  );
}

export default Home;
