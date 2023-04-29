import React, { useEffect, useRef, useState } from "react";
import Space from "./Space";
import SwitchButton from "./SwitchButton";
import Input from "./Input";

type Props = {
  city: string | undefined;
};

const DoubleSearchBar = ({ city }: Props) => {
  const inputDeparture = useRef<HTMLInputElement>(null);
  const inputArrival = useRef<HTMLInputElement>(null);
  const [departureValue, setDepartureValue] = useState<string>(city || "");
  const [arrivalValue, setArrivalValue] = useState<string>("");
  const [rotate, setRotate] = useState(90);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.remove("searchbar-active");
  });

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDepartureValue(arrivalValue);
    setArrivalValue(departureValue);
    setRotate(rotate + 180);
  };

  const focusInput = (input: React.RefObject<HTMLInputElement>) =>
    input.current?.focus();

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
            onChange={(event) => setDepartureValue(event.target.value)}
            onClick={() => focusInput(inputDeparture)}
            inputRef={inputDeparture}
          />
          <Input
            label="Arrivée"
            placeholder="Où allons-nous ?"
            value={arrivalValue}
            className="arrival"
            onChange={(event) => setArrivalValue(event.target.value)}
            onClick={() => focusInput(inputArrival)}
            inputRef={inputArrival}
          />
          <SwitchButton onClick={handleButtonClick} rotate={rotate} />
        </form>
      </div>
    </div>
  );
};

export default DoubleSearchBar;
