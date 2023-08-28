import React, { useEffect, useRef } from 'react';
import './canvas.css';

const Canvas = props => {
    const { main, height, width, ...rest } = props;
    const boardRef = useRef(null);

    let notRunning = true;

    useEffect(() => {
        const board = boardRef.current;

        const canvas = board.children[0];
        const context = canvas.getContext('2d');
        const scoreField = board.children[1];

        if(notRunning && canvas && scoreField){
            main(context, scoreField);
            notRunning = false;
        }
    }, [main]);

    return (
        <div ref={boardRef}>
            <canvas height={height} width={width} {...rest} />
            <h2></h2>
        </div>
    );
}

export default Canvas;