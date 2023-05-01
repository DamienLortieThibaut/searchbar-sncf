import { useEffect, useState } from 'react';
import axios from 'axios';
import { Suggestion } from '../model';
import { useNavigate } from 'react-router-dom';

type Props = {
    inputMessage: string | undefined
}

const SubmitButton = ({ inputMessage }: Props) => {
    const [suggestions, setSuggestion] = useState<Suggestion[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (inputMessage === "") {
            axios.get("https://api.comparatrip.eu/cities/popular/5").then((res) => setSuggestion(res.data));
        } else {
            axios.get("https://api.comparatrip.eu/cities/autocomplete/?q=" + inputMessage).then((res) => setSuggestion(res.data));
        }
    }, [inputMessage]);

    const selectChoice = () => {
        if (suggestions[0]) navigate("/search/" + suggestions[0].local_name.match(/^[^,]*/) + "/" + suggestions[0].unique_name);
        else navigate("/search"); 
    };

    return (
        <div>
            <input type="submit" value='Envoyer' onClick={selectChoice}/>
        </div>
    );
};

export default SubmitButton;