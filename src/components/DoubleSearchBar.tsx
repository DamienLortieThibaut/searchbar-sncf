import React, { useEffect, useRef, useState } from "react";
import Space from "./Space";
import SwitchButton from "./SwitchButton";
import Input from "./Input";
import Result from "./Result";

type Props = {
  city: string | undefined;
  uniqueName: string | undefined;
};

const DoubleSearchBar = ({ city, uniqueName }: Props) => {
  const inputDeparture = useRef<HTMLInputElement>(null);
  const inputArrival = useRef<HTMLInputElement>(null);

  const [departureValue, setDepartureValue] = useState<string>(city || "");
  const [cityLink, setCityLink] = useState<string>(uniqueName || "");
  const [arrivalValue, setArrivalValue] = useState<string>("");
  const [rotate, setRotate] = useState<number>(90);
  const [inputFocused, setInputFocused] = useState<string | null>("arrival");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.remove("searchbar-active");
  });

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDepartureValue(arrivalValue);
    setCityLink(arrivalValue);
    setArrivalValue(departureValue);
    setRotate(rotate + 180);
  };

  const focusInput = (input: React.RefObject<HTMLInputElement>) =>
    input.current?.focus();

  const handleInputBlur = () => {
    setTimeout(() => {
      setInputFocused(null);
    }, 150);
  };

  const handleInputFocus = (inputName: string) => {
    setTimeout(() => {
      setInputFocused(inputName);
    }, 180);
  };

  const updateInputMessage = (
    city: string,
    suggestion: string,
    inputName: string
  ) => {
    const regex = /^[^,]*/;
    const match = suggestion.match(regex);
    if (inputName === "departure") {
      setCityLink(city);
      setDepartureValue(match ? match[0] : "");
      if (arrivalValue === "") {
        focusInput(inputArrival);
      }
    } else setArrivalValue(match ? match[0] : "");
  };

  return (
    <div className="doublesearchbar">
      <div className="container">
        <Space />
        <form>
          <Input
            label="Départ"
            placeholder="D'où partons-nous ?"
            value={departureValue}
            className="departure"
            onChange={() =>
              setDepartureValue(inputDeparture.current?.value || "")
            }
            onClick={() => focusInput(inputDeparture)}
            inputRef={inputDeparture}
            onBlur={handleInputBlur}
            onFocus={() => handleInputFocus("departure")}
          />
          <Input
            label="Arrivée"
            placeholder="Où allons-nous ?"
            value={arrivalValue}
            className="arrival"
            onChange={() => setArrivalValue(inputArrival.current?.value || "")}
            onClick={() => focusInput(inputArrival)}
            inputRef={inputArrival}
            onBlur={handleInputBlur}
            autoFocus
            onFocus={() => handleInputFocus("arrival")}
          />
          <SwitchButton onClick={handleButtonClick} rotate={rotate} />
        </form>
        {inputFocused && (
          <Result
            inputFocused={inputFocused}
            cityLink={cityLink}
            arrivalValue={inputArrival.current?.value}
            departureValue={inputDeparture.current?.value}
            updateInputMessage={updateInputMessage}
          />
        )}
      </div>
    </div>
  );
};

export default DoubleSearchBar;
