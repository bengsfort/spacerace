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

        this.controller.AddOnFireListener(() => {
            console.log("Dear sir, madam. FIRE! FIRE! FIRE!");
        });
    }

    /**
     * Used to update the ship and apply controls.
     * @param {CanvasRenderingContext2D} canvas The canvas to render to.
     */
    Update(canvas) {
        this.Move(this.controller.GetXAxis(), this.controller.GetYAxis());

        canvas.fillRect(this.x, this.y, 10, 10);
    }
}