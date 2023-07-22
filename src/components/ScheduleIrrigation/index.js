import { useState, useEffect } from "react";
import { getCurrentDate, getCurrentTime } from "../../utils/dateUtils";

function NewIrrigation() {
  const [scheduleName, setScheduleName] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  useEffect(() => {
    const { hours, minutes, dateString } = getCurrentDate()
    setScheduleDate(dateString || "");
    setScheduleTime(`${hours + 2}:${minutes}`);
  }, []);

  return (
    <div className="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
      <article className="shadow-lg pt-0">
        <header className="text-center mb-4 d-flex justify-content-center">
          <strong className="me-3">Agendar nova irrigação</strong>
        </header>
        <form className="mb-0">
          <div className="d-flex flex-column mb-4">
            <label className="mb-2" htmlFor="scheduleName">
              Nome
            </label>
            <input
              type="text"
              id="scheduleName"
              name="scheduleName"
              placeholder="Nome do agendamento"
              value={scheduleName}
              onChange={e => setScheduleName(e.target.value)}
              required
            />

            <label className="mb-2" htmlFor="scheduleDate">
              Data
            </label>
            <input
              type="date"
              id="scheduleDate"
              name="scheduleDate"
              pattern="\d{2}-\d{2}-\d{4}"
              placeholder="Data do agendamento"
              value={scheduleDate}
              onChange={e => setScheduleDate(e.target.value)}
              required
            />

            <label className="mb-2" htmlFor="scheduleTime">
              Hora
            </label>
            <input
              type="time"
              id="scheduleTime"
              name="scheduleTime"
              placeholder="Hora do agendamento"
              value={scheduleTime}
              onChange={e => setScheduleTime(e.target.value)}
              required
            />
          </div>

          <button type="submit">Agendar</button>
        </form>
      </article>
    </div>
  );
}

export default NewIrrigation;
