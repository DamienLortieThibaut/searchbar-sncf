import { useEffect, useRef, useState } from 'react';
import Result from './Result';

const SingleSearchBar = () => {
    const scroll = useRef<null | HTMLDivElement>(null);
    const [inputFocused, setInputFocused] = useState(false);
    const inputMessage = useRef<HTMLInputElement | null>(null); 

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!inputFocused && document.activeElement?.tagName !== "INPUT") {
                document.body.classList.remove("searchbar-active");
            } else if (inputFocused){
                scroll.current?.scrollIntoView({ behavior: 'smooth' });
                document.body.classList.add("searchbar-active");
            }
        }
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [inputFocused]);

    const handleInputBlur = () => setInputFocused(false);

    const handleInputFocus = () => setInputFocused(true);

    return (
        <form className='form-singlesearchbar'>
            <div className="singlesearchbar" ref={scroll}>
                <div className="container">
                    <input type="search" placeholder='Une destination, demande ...' onFocus={handleInputFocus} onBlur={handleInputBlur} id='inputMessage' ref={inputMessage}/>
                    <input type="submit" value='Envoyer' />
                </div>
            </div>
            <div className="departure">
                {inputFocused &&  <Result inputMessage={ inputMessage?.current?.value} />}
            </div>
        </form>
    );
};

export default SingleSearchBar;