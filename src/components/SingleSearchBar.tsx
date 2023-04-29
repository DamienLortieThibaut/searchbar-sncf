import { useEffect, useRef, useState } from "react";
import Result from "./Result";
import SubmitButton from "./SubmitButton";

const SingleSearchBar = () => {
  const scroll = useRef<null | HTMLDivElement>(null);
  const inputMessage = useRef<HTMLInputElement | null>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
      setInputFocused(false);
    }, 300);
  };

  const handleInputFocus = () => setInputFocused(true);

  const updateInputMessage = (suggestion: string) => {
    const regex = /^[^,]*/;
    const match = suggestion.match(regex);
    setInputValue(match ? match[0] : "");
  };

  const handleInputChange = () => {
    setInputValue(inputMessage?.current?.value || "");
  };

  return (
    <div className="form-singlesearchbar">
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
            inputMessage={inputMessage?.current?.value}
            updateInputMessage={updateInputMessage}
          />
        )}
      </div>
    </div>
  );
};

export default SingleSearchBar;
