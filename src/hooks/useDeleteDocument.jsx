import { useState, useEffect, useReducer } from "react";
import {db} from "../firebase/config"
import { doc, deleteDoc } from "firebase/firestore";

const initalState = {
    loading: null,
    error: null
}

const deleteReducer = (state, action) => {
    switch(action.type){

        case "LOADING":
            return {loading: true, error: null}
        case "DELETED_DOC":
            return {loading: false, error:null}
        case "ERROR":
            return {loading: false, error: action.payLoad}
        default:
            return state;
    }
}

export const useDeleteDocument = (docCollection) => {

    const [response, dispatch] = useReducer(deleteReducer, initalState)

    // deal memory leak
    const [cancelled, setCancelled] = useState(false);

    const checkCancelBeforeDispath = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const deleteDocument = async(id) => {

        checkCancelBeforeDispath({
            type: "LOADING",
        });

        try {
            
            const deletedDocument = await deleteDoc(doc(db, docCollection, id))

            checkCancelBeforeDispath({
                type: "DELETED_DOC",
                payLoad: deletedDocument,
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

    return {deleteDocument, response}

}