import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="d-flex flex-column align-items-center text-center mt-2-3rem px-2 px-sm-0 fs-5">
      <h1 className="text-danger fw-normal mb-5">
        Essa página não existe!
      </h1>
      <Link to="/">
        Voltar para a página inicial
      </Link>
    </div>
  );
}

export default Error;
