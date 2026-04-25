import axios from "axios"
import { useEffect, useState } from "react";
import { API_URL } from "../constants/index.js";

export const Onboarding = ()=>{

    const [data, setData ] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${API_URL}/health-check`);
            setData(response.data);
        };
        fetchData();
    }, [])

    return(
        <>
         The data returned is {data}
        </>
    )
}

