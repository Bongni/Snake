import React, { Component } from 'react';

import './game.css';

import Canvas from './canvas';

const HEIGHT = 400;
const WIDTH = 400;

const BACKGROUND_COLOR = 'white';
const BORDER_COLOR = 'black';
const SNAKE_COLOR = 'blue';



export default class Game extends Component {
    constructor () {
        super();
        this.snake = [{x: WIDTH / 2, y: HEIGHT / 2}, {x: WIDTH / 2 + 10, y: HEIGHT / 2}, {x: WIDTH / 2 + 20, y: HEIGHT / 2}];
        this.dx = -10;
        this.dy = 0;
    }

    clearCanvas(context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = BACKGROUND_COLOR;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        
        context.strokeStyle = BORDER_COLOR;
        context.lineWidth = 2;
        context.strokeRect(0, 0, context.canvas.width, context.canvas.height);
    }

    drawSnake(context) {
        this.snake.forEach(element => {
            context.fillStyle = SNAKE_COLOR
            context.fillRect(element.x, element.y, 10, 10);
        });
    }

    moveSnake() {
        const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
        this.snake.unshift(head);
        this.snake.pop();
    }

    render () {
        window.addEventListener('keydown', (event) => {
            const keyPressed = event.code;

            const goingUp = this.dy === -10;
            const goingDown = this.dy === 10;
            const goingRight = this.dx === 10;  
            const goingLeft = this.dx === -10;

            if (keyPressed === "ArrowLeft" && !goingRight) {
                this.dx = -10;
                this.dy = 0;
            }

            if (keyPressed === "ArrowUp" && !goingDown) {
                this.dx = 0;
                this.dy = -10;
            }

            if (keyPressed === "ArrowRight" && !goingLeft) {
                this.dx = 10;
                this.dy = 0;
            }

            if (keyPressed === "ArrowDown" && !goingUp) {
                this.dx = 0;
                this.dy = 10;
            }
        }, false);

        const main = (context) => {
            setTimeout(() => {
                this.clearCanvas(context);

                this.moveSnake();
                this.drawSnake(context);

                /* Game loop */
                main(context);
            }, 100);
        }

        return (
            <div className="game">
                <Canvas main={main} height={HEIGHT} width={WIDTH}/>
            </div>
        );
    }
}