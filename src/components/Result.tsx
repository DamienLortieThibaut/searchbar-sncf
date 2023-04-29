import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Suggestion } from "../model";

type Props = {
  inputMessage: string | undefined;
  updateInputMessage: (suggestion: string) => void;
};

const Result = ({ inputMessage, updateInputMessage }: Props) => {
  const [suggestions, setSuggestion] = useState<Suggestion[]>([]);

  useEffect(() => {
    if (inputMessage === "") {
      axios
        .get("https://api.comparatrip.eu/cities/popular/5")
        .then((res) => setSuggestion(res.data));
    } else {
      axios
        .get(
          "https://api.comparatrip.eu/cities/autocomplete/?q=" + inputMessage
        )
        .then((res) => setSuggestion(res.data));
    }
  }, [inputMessage]);

  return (
    <div>
      <ul>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.id}
            onClick={() => updateInputMessage(suggestion.local_name)}
          >
            <NavLink to={"/search/" + suggestion.local_name.match(/^[^,]*/)}>
              <span>{suggestion.local_name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
