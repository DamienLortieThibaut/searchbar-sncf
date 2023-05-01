import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Suggestion } from "../model";

type Props = {
  inputFocused: string | null;
  departureValue?: string;
  arrivalValue?: string;
  cityLink?: string;
  updateInputMessage: (
    city: string,
    suggestion: string,
    inputName: string
  ) => void;
};

const Result = ({
  inputFocused,
  departureValue,
  arrivalValue,
  cityLink,
  updateInputMessage,
}: Props) => {
  const [suggestions, setSuggestion] = useState<Suggestion[]>([]);

  useEffect(() => {
    let apiUrl = "https://api.comparatrip.eu/cities/popular/5";
    let queryParam = "";

    
    if (inputFocused === "departure" && departureValue !== undefined) {
      queryParam = departureValue;
    } else if (inputFocused === "arrival" && arrivalValue !== "" && arrivalValue !== undefined) {
      queryParam = arrivalValue;
      
    } else if (inputFocused === "arrival" && arrivalValue === "" && departureValue !== "") {
      apiUrl = `https://api.comparatrip.eu/cities/popular/from/${cityLink}/5`;
    }

    if (queryParam) {
      apiUrl = `https://api.comparatrip.eu/cities/autocomplete/?q=${queryParam}`;
    }

    axios.get(apiUrl).then((res) => setSuggestion(res.data));
  }, [departureValue, arrivalValue, inputFocused, cityLink]);

  return (
    <div className="result">
      <ul>
        {inputFocused &&
          suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() =>
                updateInputMessage(
                  suggestion.unique_name,
                  suggestion.local_name,
                  inputFocused
                )
              }
            >
              <NavLink to={"/search/" + suggestion.local_name.match(/^[^,]*/) + "/" + suggestion.unique_name}>
                <span>{suggestion.local_name}</span>
              </NavLink>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Result;
