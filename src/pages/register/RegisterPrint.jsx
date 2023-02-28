import styles from "./RegisterPrint.module.css"

import { useState, useEffect } from "react"
import { useAuthentication } from "../../hooks/useAuthentication";

const RegisterPrint = () => {

  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const {createUser, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('')

    const user = {
      displayName,
      email,
      password
    }

    if (password !== confirmpassword) {
     setError('as senhas não são iguais');
     return
    }

    const res = await createUser(user);

    console.log(res);
  };

  useEffect(() => {

    if (authError) {
      setError(authError);
    }

  }, [authError]);

  return (
    <div className={styles.resginter}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas historias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input 
          type="text" 
          name="diplayname" 
          required 
          placeholder="Nome do usuario"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}/>
        </label>
        <label>
          <span>Email:</span>
          <input 
          type="email" 
          name="email" 
          required 
          placeholder="Email do usuario"
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          <span>Senha:</span>
          <input 
          type="password" 
          name="password" 
          required 
          placeholder="Insira sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <label>
          <span>Confimar senha:</span>
          <input 
          type="password" 
          name="confirmpassword" 
          required 
          placeholder="Confirme a sua senha"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}/>
        </label>
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && (<button disabled className="btn">Aguarde...</button>)}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default RegisterPrint