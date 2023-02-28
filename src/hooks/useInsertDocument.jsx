import { useState, useEffect, useReducer } from "react";
import {db} from "../firebase/config"
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initalState = {
    loading: null,
    error: null
}

const insertReducer = (state, action) => {
    switch(action.type){

        case "LOADING":
            return {loading: true, error: null}
        case "INSERTED_DOC":
            return {loading: false, error:null}
        case "ERROR":
            return {loading: false, error: action.payLoad}
        default:
            return state;
    }
}

export const useInsertDocument = (docCollection) =>{

    const [response, dispatch] = useReducer(insertReducer, initalState)

    // deal memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispath = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertDocument = async(document) => {

        checkCancelBeforeDispath({
            type: "LOADING",
            payLoad: insertDocument
        })

        try {
            
            const newDocument = {...document, createdAt: Timestamp.now()}

            const insertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            )

            checkCancelBeforeDispath({
                type: "INSERTED_DOC",
                payLoad: insertDocument
            })

        } catch (error) {

            checkCancelBeforeDispath({
                type: "ERROR",
                payLoad: error.message,
            })

        }

    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {insertDocument, response}

}