import { Ship } from "./entities";
import { GamepadController, KeyboardController } from "./controllers";

class Game {

    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = 1336;
        this.canvas.height = 860;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.keyboard = true;

        this.toggleButton = document.createElement("button");
        this.toggleButton.innerText = "Controls: Keyboard";
        this.toggleButton.addEventListener("click", (ev) => {
            if (this.keyboard) {
                this.toggleButton.innerText = "Controls: Gamepad";
                this.ship.controller = new GamepadController(0);
            } else {
                this.toggleButton.innerText = "Controls: Keyboard";
                this.ship.controller = new KeyboardController();
            }
            this.keyboard = !this.keyboard;
        });
        document.body.appendChild(this.toggleButton);

        this.tut = document.createElement("div");
        this.tut.innerHTML = "Press [Left arrow]/[A] to turn left and [Right arrow]/[D] to turn right.<br>You can also switch to gamepad scheme using the button bellow, which uses the top triggers on the gamepad.";
        document.body.appendChild(this.tut);

        this.ship = new Ship(500, 400, new KeyboardController(0));

        this.Update();
    }

    Update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ship.Update(this.ctx);

        requestAnimationFrame(this.Update.bind(this));
    }
}

let game = new Game();