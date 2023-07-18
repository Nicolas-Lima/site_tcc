import { useContext } from "react";
import { FormContext } from "../../contexts/formContext";
import eye from "../../assets/eye-fill.svg";
import eyeSlash from "../../assets/eye-slash-fill.svg";

function PasswordToggle() {
  const { password, showingPassword, setShowingPassword } =
    useContext(FormContext);

  if (password.length > 0) {
    return (
      <i
        className="passwordToggle"
        onClick={() => {
          setShowingPassword(prevState => !prevState);
        }}>
        {showingPassword ? (
          <img src={eyeSlash} />
        ) : (
          <img src={eye} />
        )}
      </i>
    );
  }
}

export default PasswordToggle;
