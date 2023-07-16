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
  const [emailInputStarted, setEmailInputStarted] = useState(false);
  const [passwordInputStarted, setPasswordInputStarted] = useState(false);

  const navigate = useNavigate()
  
  useEffect(() => {
    if(emailInputStarted) {
      validateEmail()
    }
  }, [email])

  useEffect(() => {
    if(passwordInputStarted) {
      validatePassword()
    }
  }, [password])

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
        condition: !email.split("@").pop().trim(),
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
        condition: !(password.length > 6),
        errorMessage: "Seu senha tem que ter mais de seis digitos."
      },
      {
        condition: !password,
        errorMessage: "Seu endereço de password está vazio!"
      },
      {
        condition: !password.includes("@"),
        errorMessage: "Inclua um @ no seu endereço de password!"
      },
      {
        condition: !email.split("@").pop().trim(),
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
              navigate("/")

              return
          })
          .catch(error => {
              console.log("erro ao criar", error.code)
              switch(error.code) {
                case "auth/weak-password":
                  setPasswordError("Senha fraca")
                  break
                case "auth/email-already-in-use":
                  console.log("email já esta em uso")
                  break
                case "auth/invalid-email":
                  setEmailError("Email inválido!")
                  break
              }
          })
  }
    
    return (
      <div className="container py-0">
        <div className="row justify-content-center gx-sm-5 mb-4 mt-5">
          <div className="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
            <article className="shadow-lg pt-0">
              <header className="text-center mb-4 d-flex justify-content-center">
                <strong className="me-3">Registrar</strong>
              </header>
              <form
                method="post"
                className="mb-0"
                onSubmit={handleSubmit}
                noValidate>
                <div className="d-flex flex-column mb-4">
                  <label className="mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value)
                        if(!emailInputStarted) {
                          setEmailInputStarted(true)
                        }
                      }
                    }
                    aria-invalid={
                      emailInputStarted || formSubmitted ? (emailError ? "true" : "false") : ""
                    }
                  />
                  <div
                    className={`mt-1 mb-2 ${
                      emailError ? "d-initial" : "d-none"
                    }`}>
                    <span className="email-error text-pico-danger">
                      {emailError}
                    </span>
                  </div>

                  <label className="my-2" htmlFor="password">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                        if(!passwordInputStarted) {
                          setPasswordInputStarted(true)
                        }
                      }
                    }
                    aria-invalid={
                      passwordInputStarted || formSubmitted ? (passwordError ? "true" : "false") : ""
                    }
                  />
                  <div
                    className={`mt-1 mb-2 ${
                      passwordError ? "d-initial" : "d-none"
                    }`}>
                    <span className="email-error text-pico-danger">
                      {passwordError}
                    </span>
                  </div>
                </div>

                <button type="submit mt-0">Registrar</button>
              </form>
            </article>
          </div>
        </div>
      </div>
    );

}

export default Login