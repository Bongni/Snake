import React, { useRef } from 'react';
import './start.css';

const Start = () => {
    const inputRef = useRef(null);

    function start () {
        const StartGame = new CustomEvent('StartGame', { detail: { name: inputRef.current.value } });
        document.dispatchEvent(StartGame);
    }

    return (
        <div className="start">
            <h1>Snake</h1>
            <form>
                <label htmlFor="name">Enter name: </label>
                <input  id="name" 
                        type="text"
                        ref={inputRef} />
            </form>
            <button onClick={start}>
                Start
            </button>
        </div>
    );
}

export default Start;
