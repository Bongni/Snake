import React, { useEffect, useRef } from 'react';

const Canvas = props => {
    const { main, height, width, ...rest } = props;
    const canvasRef = useRef(null);

    let notRunning = true;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if(notRunning){
            main(context);
            notRunning = false;
        }
    }, [main]);

    return <canvas ref={canvasRef} height={height} width={width} {...rest} />
}

export default Canvas;