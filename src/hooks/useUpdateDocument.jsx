import { useState, useEffect, useReducer } from "react";
import {db} from "../firebase/config"
import { updateDoc, doc, collection } from "firebase/firestore";

const initalState = {
    loading: null,
    error: null
}

const updateReducer = (state, action) => {
    switch(action.type){

        case "LOADING":
            return {loading: true, error: null}
        case "UPDATED_DOC":
            return {loading: false, error:null}
        case "ERROR":
            return {loading: false, error: action.payLoad}
        default:
            return state;
    }
}

export const useUpdateDocument = (docCollection) =>
{

    const [response, dispatch] = useReducer(updateReducer, initalState)

    // deal memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispath = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const updateDocument = async(id, data) => {

        checkCancelBeforeDispath({
            type: "LOADING",
            payLoad: updateDocument
        })

        try {
            
            const docRef = await doc(db, docCollection, id)

            const updatedDocument = await updateDoc(docRef, data);

            checkCancelBeforeDispath({
                type: "UPDATED_DOC",
                payLoad: updatedDocument
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

    return {updateDocument, response}

}