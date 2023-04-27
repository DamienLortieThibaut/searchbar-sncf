import { useEffect, useState } from 'react';
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

const Search = () => {
    const [suggestions, setSuggestion] = useState<Suggestion[]>([]);

    useEffect(() => {
        axios.get("https://api.comparatrip.eu/cities/popular/5").then((res) => setSuggestion(res.data))
    }, []);

    return (
        <div>
            <ul>
                {suggestions.map(suggestion => <li>{ suggestion.local_name}</li>
                )}
            </ul>
        </div>
    );
};

export default Search;