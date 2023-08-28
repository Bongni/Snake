import React, { Component } from 'react';
import './game.css';

import Canvas from './canvas';

const HEIGHT = 400;
const WIDTH = 400;

const BACKGROUND_COLOR = 'white';
const BORDER_COLOR = 'black';
const SNAKE_COLOR = 'green';
const FOOD_COLOR = 'red';

const GameOver = new Event('GameOver');

export default class Game extends Component {
    constructor (player) {
        super();
        this.player = player;

        this.snake = [{x: WIDTH / 2, y: HEIGHT / 2}];
        this.dx = -10;
        this.dy = 0;

        this.score = 0;

        this.genFood();
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

        const eatenFood = head.x == this.foodx && head.y == this.foody;

        if(eatenFood) {
            this.genFood();
            this.score++;
        } else {
            this.snake.pop();
        }
    }

    updateScore (scoreField) {
        scoreField.innerHTML = this.score;
    }

    genFood () {
        this.foodx = Math.floor(Math.random() * WIDTH / 10) * 10;
        this.foody = Math.floor(Math.random() * HEIGHT / 10) * 10;
    }

    drawFood (context) {
        context.fillStyle = FOOD_COLOR;
        context.fillRect(this.foodx, this.foody, 10, 10);
    }

    collision () {
        const collisionWallx = this.snake[0].x >= WIDTH || this.snake[0].x < 0;
        const collisionWally = this.snake[0].y >= HEIGHT || this.snake[0].y < 0;

        let collisionSnake = false;
        const [head, ...tail] = this.snake;
        tail.forEach(elem => {
            if(elem.x == head.x && elem.y == head.y) {
                collisionSnake = true;
            }
        });

        return collisionWallx || collisionWally || collisionSnake;
    }

    gameOver () {
        this.player.setLastScore(this.score);
        this.player.setHighScore(this.score);

        document.dispatchEvent(GameOver);
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

        const main = (context, scoreField) => {
            setTimeout(() => {
                this.clearCanvas(context);

                this.moveSnake();

                this.drawSnake(context);
                this.drawFood(context);

                this.updateScore(scoreField);

                if(this.collision()) {
                    this.gameOver();
                    return;
                }

                /* Game loop */
                main(context, scoreField);
            }, 100);
        }

        return (
            <div className="game">
                <Canvas main={main} height={HEIGHT} width={WIDTH}/>
            </div>
        );
    }
}