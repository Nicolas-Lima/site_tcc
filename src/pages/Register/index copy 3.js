import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { auth } from "../../firebaseConnection"
import { createUserWithEmailAndPassword } from "firebase/auth"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [formSubmitted, setFormSubmitted] = useState(false)

    const navigate = useNavigate()
    
    useEffect(() => {
      if(formSubmitted) {
        validateEmail()
        validatePassword()
      }
    }, [email, password])

    const validateEmail = () => {

      let isValid = true
      let errorMessage = ""

      const validationConditions = [
        {
          condition: !email,
          errorMessage: "Seu endereço de email está vazio!"
        },
        {
          condition: !email.includes("@"),
          errorMessage: "Inclua um @ no seu endereço de email!"
        },
        {
          condition: !email.split("@")[1]?.trim(),
          errorMessage: "Digite algo depois do @"
        },
        {
          condition: !email.split("@")[0]?.trim(),
          errorMessage: "Digite algo antes do @"
        }
      ];

      validationConditions.forEach(condition => {
        if (condition.condition && isValid) {
      
          isValid = false;
          errorMessage = condition.errorMessage;
          
        }
      });

      setEmailError(errorMessage)

      return isValid
    }

    const validatePassword = () => {
      
      let isValid = true
      let errorMessage = ""

      const validationConditions = [
        {
          condition: !password,
          errorMessage: "Seu endereço de password está vazio!"
        },
        {
          condition: !password.includes("@"),
          errorMessage: "Inclua um @ no seu endereço de password!"
        },
        {
          condition: !password.split("@")[1]?.trim(),
          errorMessage: "Digite algo depois do @"
        },
        {
          condition: !password.split("@")[0]?.trim(),
          errorMessage: "Digite algo antes do @"
        }
      ];

      validationConditions.forEach(condition => {
        if (condition.condition && isValid) {
          isValid = false;
          errorMessage = condition.errorMessage;
        }
      });

      setPasswordError(errorMessage)

      return isValid
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        setFormSubmitted(true)

        const isEmailValid = validateEmail()
        const isPasswordValid = validatePassword()

        if(!isEmailValid || !isPasswordValid) {
          return
        }

        else {
          setEmailError("")
          setPasswordError("")
        }
        
        await createUserWithEmailAndPassword(auth, email, password)
            .then(value => {
                const userDetails = {
                  email: value.user.email,
                  uid: value.user.uid
                }
                localStorage.setItem("@userDetails", JSON.stringify(userDetails))
                return navigate("/")
            })
            .catch(error => {
                switch(error.code) {
                  case "auth/weak-password":
                    console.log("senha fraca")
                    break
                  case "auth/email-already-in-use":
                    console.log("email já esta em uso")
                    break
                }
            })
    }
    
    return (
      <div className="container py-0">
        <div className="row justify-content-center gx-sm-5 mb-4 mt-5">
          <div className="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6 border rounded p-5">
            <form
              className="needs-validation"
              noValidate
              onSubmit={handleSubmit}>
              <div className="d-flex justify-content-center fs-5 text-secondary mb-4">Registrar</div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <div className="input-group has-validation">
                  <input
                    type="email"
                    className={`form-control ${emailError ? "is-invalid" : "is-valid"}`}
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <div className="invalid-feedback d-block">
                    {emailError}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <div className="input-group has-validation">
                  <input
                    type="password"
                    className={`form-control ${passwordError ? "is-invalid" : "is-valid"}`}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <div className="invalid-feedback d-block">
                    {passwordError}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </div>
    );

}

export default Login