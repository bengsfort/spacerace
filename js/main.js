import { Ship } from "./entities";
import { GamepadController } from "./controllers";

class Game {

    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.ship = new Ship(50, 50, new GamepadController(0));

        this.Update();
    }

    Update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ship.Update(this.ctx);

        requestAnimationFrame(this.Update.bind(this));
    }
}

let game = new Game();