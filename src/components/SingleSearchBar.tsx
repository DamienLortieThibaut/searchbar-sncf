import { useEffect, useRef, useState } from "react";
import Result from "./Result";
import SubmitButton from "./SubmitButton";

const SingleSearchBar = () => {
  const scroll = useRef<null | HTMLDivElement>(null);
  const inputMessage = useRef<HTMLInputElement | null>(null);
  const [inputFocused, setInputFocused] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [cityLink, setCityLink] = useState<string>("");

  useEffect(() => {
    const handleClick = () => {
      if (document.activeElement?.tagName !== "INPUT") {
        document.body.classList.remove("searchbar-active");
      } else if (inputFocused) {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
        document.body.classList.add("searchbar-active");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [inputFocused]);

  const handleInputBlur = () => {
    setTimeout(() => {
      setInputFocused(null);
    }, 300);
  };

  const handleInputFocus = () => setInputFocused("departure");

  const updateInputMessage = (city: string, suggestion: string) => {
    const regex = /^[^,]*/;
    const match = suggestion.match(regex);
    setCityLink(city);
    setInputValue(match ? match[0] : "");
  };

  const handleInputChange = () => {
    setInputValue(inputMessage?.current?.value || "");
  };

  return (
    <form className="form-singlesearchbar">
      <div className="singlesearchbar" ref={scroll}>
        <div className="container">
          <input
            type="search"
            placeholder="Une destination, demande ..."
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            id="inputMessage"
            ref={inputMessage}
            onChange={handleInputChange}
            value={inputValue}
          />
          <SubmitButton inputMessage={inputMessage?.current?.value} />
        </div>
      </div>
      <div className="departure">
        {inputFocused && (
          <Result
            inputFocused={inputFocused}
            cityLink={cityLink}
            departureValue={inputMessage?.current?.value}
            updateInputMessage={updateInputMessage}
          />
        )}
      </div>
    </form>
  );
};

export default SingleSearchBar;
