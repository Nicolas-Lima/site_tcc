function NewIrrigation() {
  return (
    <div className="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
      <article className="shadow-lg pt-0">
        <header className="text-center mb-4 d-flex justify-content-center">
          <strong className="me-3">Agendar nova irrigação</strong>
        </header>
        <form className="mb-0">
          <div className="d-flex flex-column mb-4">
            <label className="mb-2" htmlFor="firstname">
              Nome
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Nome do agendamento"
              required
            />

            <label className="mb-2" htmlFor="lastname">
              Data
            </label>
            <input
              type="date"
              id="lastname"
              name="lastname"
              placeholder="Last name"
              required
            />

            <label className="mb-2" htmlFor="lastname">
              Hora
            </label>
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
  );
}

export default NewIrrigation