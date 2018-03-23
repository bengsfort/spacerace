export class Controller {

    constructor() {
        this._onFireListeners = [];
    }

    /**
     * Used to query the state of the turning axis.
     * @returns {number} the state of the turning axis
     */
    GetTurningAxis() { }

    /**
     * 
     * @param {() => void} listener 
     */
    AddOnFireListener(listener) {
        this._onFireListeners.push(listener);
    }
}

export class GamepadController extends Controller {

    /**
     * Creates a new gamepad controller.
     * @param {number} gamepadId The id of the gamepad
     */
    constructor(gamepadId) {
        super();
        this.gamepadId = gamepadId;
        
        setInterval(() => {
            let gp = navigator.getGamepads()[this.gamepadId];
            if (gp.buttons[0].pressed) {
                this._onFireListeners.forEach( (value) => value() );
            }
        }, 1000 / 60);
    }

    /**
     * Used to query the state of the turning axis.
     * @returns {number} the state of the turning axis
     */
    GetTurningAxis() {
        let gp = navigator.getGamepads()[this.gamepadId];
        return - gp.buttons[6].value + gp.buttons[7].value;
    }
}

export class KeyboardController extends Controller {

    constructor() {
        super();

        this.state = {
            right: false,
            left: false,
            fire: false
        }

        document.addEventListener("keydown", this.OnKeyDown.bind(this));
        document.addEventListener("keyup", this.OnKeyUp.bind(this));
    }

    /**
     * Called when a key is pressed.
     * @param {KeyboardEvent} ev The event.
     */
    OnKeyDown(ev) {
        switch (ev.key) {
            case "ArrowRight":
            case "d":
                this.state.right = true;
                break;
            case "ArrowLeft":
            case "a":
                this.state.left = true;
                break;
            case "Space":
                this._onFireListeners.forEach( (value) => value() );
                break;
        }
    }

    /**
     * Called when a key is released.
     * @param {KeyboardEvent} ev The event.
     */
    OnKeyUp(ev) {
        switch (ev.key) {
            case "ArrowRight":
            case "d":
                this.state.right = false;
                break;
            case "ArrowLeft":
            case "a":
                this.state.left = false;
                break;
        }
    }

    /**
     * Used to query the state of the turning axis.
     * @returns {number} the state of the turning axis
     */
    GetTurningAxis() {
        let tmp = 0;

        tmp -= (this.state.left)? 1: 0;
        tmp += (this.state.right)? 1: 0;

        return tmp;
    }
}