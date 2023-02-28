import {db} from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    signInWithEmailAndPassword
} from "firebase/auth"

import { useEffect, useState } from "react"


export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [ loading, setLoading] = useState(null);

    // cleanup
    // deal with memory leak

    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true);
        setError(null);

        try {
            
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: name.displayName
            })

            setLoading(false);

            return user

        } catch (error) {
            
            console.log(error);
            console.log(typeof error.message);

            let sytemErrorMessage;

            if (error.message.includes("Password")) {
                sytemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            } else if(error.message.includes("email-already")){
                sytemErrorMessage = "E-mail já cadastrado."
            } else {
                sytemErrorMessage = "Ocorreu um erro, porfavor tente mais tarde"
            }

            setLoading(false);

            setError(sytemErrorMessage);

        }
    }

    //logout
    const logout = () => {

        checkIfIsCancelled();

        signOut(auth);
    }

    // login - sing in
    const login = async(data) => {

        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try {
            
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)

        } catch (error) {
            let sytemErrorMessage;

            if (error.message.includes("user-not-found")) {
                sytemErrorMessage = "usuario não encontrado"
            } else if(error.message.includes("wrong-password")){
                sytemErrorMessage = "Senha incorreta."
            } else{
                sytemErrorMessage = "Ocorreu um erro, tente novamente mais tarde"
            }

            setError(sytemErrorMessage)
            setLoading(false)
        }

    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }

}
