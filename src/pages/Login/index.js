import {useState, useEffect} from "react"
import {db, auth} from "../../firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [credentialsError, setCredentialError] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        await signInWithEmailAndPassword(auth, email, password)
            .then(value => {
                console.log(value.user)
            })
            .catch(error => {
                setCredentialError(error.code)
            })
    }
    
    return (
        <div className="container py-0">
            <div className="row justify-content-center gx-sm-5 mb-4 mt-5">
                <div className="col-12 col-sm-11 col-md-9 col-lg-7 col-xl-6">
                    <article className="shadow-lg pt-0">
                      <header className="text-center mb-4 d-flex justify-content-center">
                        <strong className="me-3">Logar</strong>
                      </header>
                      <form method="post" className="mb-0" noValidate onSubmit={ handleSubmit } >
                        <div className="d-flex flex-column mb-4">
                          <label className="mb-2" htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={ e => setEmail(e.target.value)}
                            required
                          />

                          <label className="my-2" htmlFor="password">Senha</label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={ e => setPassword(e.target.value)}
                            required
                          />
                        </div>

                        <div className="mb-5">
                          {credentialsError}
                        </div>

                        <button type="submit">Logar</button>

                      </form>
                    </article>
                </div>

            </div>
      </div>
    )

}

export default Login