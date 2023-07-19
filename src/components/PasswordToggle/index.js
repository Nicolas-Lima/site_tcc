import { useContext, useEffect } from "react";
import { FormContext } from "../../contexts/formContext";
import eye from "../../assets/eye-fill.svg";
import eyeSlash from "../../assets/eye-slash-fill.svg";

function PasswordToggle() {
  const { showingPassword, setShowingPassword } = useContext(FormContext);

  useEffect(() => {
    return setShowingPassword(false);
  }, [])

  return (
    <i
      className="passwordToggle"
      onClick={() => {
        setShowingPassword(prevState => !prevState);
      }}>
      {showingPassword ? <img src={eyeSlash} /> : <img src={eye} />}
    </i>
  );
}

export default PasswordToggle;
