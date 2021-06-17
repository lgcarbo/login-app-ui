import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function usePost<T,K>(url: string): [state: {data: K | undefined, isLoading: boolean, isError: boolean }, doPost: Dispatch<SetStateAction<T | undefined>>] {

    // const [url, setUrl] = useState(initialUrl);
    const [message, setMessage] = useState<T | undefined>(undefined);
    const [data, setData] = useState<K | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const postData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                console.log(`Url='${url}' Message='${JSON.stringify(message)}'`);
                const result = await axios.post(url, message, { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } });
                setData(result.data);
            } catch(error) {
                setIsError(true);
            }
            setIsLoading(false);
        }
        
        if(message !== undefined) {
            postData();
        }

    }, [url, message]);

    return [{data, isLoading, isError}, setMessage];
};

export default usePost;