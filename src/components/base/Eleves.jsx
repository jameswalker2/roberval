import {useEffect} from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from '../login/FirebaseConfig.jsx'


export function Eleves() {

const elevesRef = collection(db, "inscription");

    useEffect(() => {
        const getInfo = async () => {
            const data = await getDocs(elevesRef);
            console.log(data);
        };
        getInfo();
    }, []);


    return (
        <>
        {/*<h1>{props.title}</h1>*/}
        </>
    )
}