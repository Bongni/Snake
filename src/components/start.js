import React, { useRef } from 'react';

import './start.css';

const StartGame = new Event('StartGame');

const Start = ({player}) => {
    const inputRef = useRef(null);

    function start () {
        player.setName(inputRef.current.value);
        document.dispatchEvent(StartGame);
    }

    return (
        <div>
            <form>
                <label for="name">Player name: </label>
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
