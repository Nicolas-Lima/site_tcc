import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="d-flex flex-column align-items-center text-center mt-5 px-2 px-sm-0">
      <h1 className="text-danger fw-normal mb-5">
        Essa página não existe!
      </h1>
      <Link to="/" className="fs-5">
        Voltar para a página inicial
      </Link>
    </div>
  );
}

export default Error;
