import "./nav.css"

function Nav(props) {
  return (
    <nav className="px-4 mt-2 d-flex">
      <ul>
        <li>
          <button
            className="openDrawer m-0 ms-2 p-1 link-dark border-0 shadow-none"
            onClick={props.handleDrawerOpen}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </li>

      </ul>
    </nav>
  );
}

export default Nav;
