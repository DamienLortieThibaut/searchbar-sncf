import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Suggestion = {
    "id": number,
    "unique_name": string,
    "local_name": string,
    "latitude": number,
    "longitude": number,
    "new_id": string,
    "city_id": number,
    "gpuid": string,
    "nb_search": string,
    "popular": boolean,
    "iscity": boolean
}

type Props = {
    inputMessage: string | undefined
}

const Result = ({ inputMessage }: Props  ) => {
    const [suggestions, setSuggestion] = useState<Suggestion[]>([]);

    useEffect(() => {
        if (inputMessage === "") {
            console.log("hello");
            axios.get("https://api.comparatrip.eu/cities/popular/5").then((res) => setSuggestion(res.data));
        }
        
    }, [inputMessage]);

    return (
        <div>
            <ul>
                {
                    suggestions.map((suggestion) => <li key={suggestion.id}>{ suggestion.unique_name}</li>)
                }
            </ul>
        </div>
    );
};

export default Result;