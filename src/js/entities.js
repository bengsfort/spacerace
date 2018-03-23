import { Controller } from "./controllers";

export class Entity {

    /**
     * An entity.
     * 
     * @param {number} x The X coordinate of the entity
     * @param {number} y The Y coordinate of the entity
     */
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Used to move the entity.
     * @param {number} x What to move by on the X axis
     * @param {number} y What to move by on the Y axis
     */
    Move(x, y) {
        this.x += x;
        this.y += y;
    }

    /**
     * Used to update and draw the entity.
     * @param {CanvasRenderingContext2D} canvas The canvas to render to.
     */
    Update(canvas) { }
}

export class Ship extends Entity {

    /**
     * An entity.
     * 
     * @param {number} x The X coordinate of the entity
     * @param {number} y The Y coordinate of the entity
     * @param {Controller} controller The controller of this ship
     */
    constructor (x, y, controller) {
        super(x, y);
        this.controller = controller;

        this.rotation = 0;
        this.speed = {
            x: 0,
            y: 0
        };

        this.controller.AddOnFireListener(() => {
            console.log("Dear sir, madam. FIRE! FIRE! FIRE!");
        });
    }

    /**
     * Used to update the ship and apply controls.
     * @param {CanvasRenderingContext2D} canvas The canvas to render to.
     */
    Update(canvas) {
        
        this.rotation += (Math.PI / 32) * this.controller.GetTurningAxis();

        if (Math.abs(this.controller.GetTurningAxis()) > 0.1) {
            this.speed.x += Math.cos(this.rotation) * 0.5;
            this.speed.y += Math.sin(this.rotation) * 0.5;
        }
        
        this.speed.x -= this.speed.x / 64;
        this.speed.y -= this.speed.y / 64;

        this.Move(this.speed.x, this.speed.y);

        canvas.beginPath();
        canvas.lineTo(this.x - Math.cos(this.rotation + 0.5) * 10, this.y - Math.sin(this.rotation + 0.5) * 10);
        canvas.lineTo(this.x + Math.cos(this.rotation) * 10, this.y + Math.sin(this.rotation) * 10);
        canvas.lineTo(this.x - Math.cos(this.rotation - 0.5) * 10, this.y - Math.sin(this.rotation - 0.5) * 10);
        canvas.stroke();
    }
}