export class Controller {

    constructor() {
        this._onFireListeners = [];
    }

    /**
     * Used to query the state of the X axis.
     * @returns {number} the state of the X axis
     */
    GetXAxis() { }

    /**
     * Used to query the state of the Y axis.
     * @returns {number} the state of the Y axis
     */
    GetYAxis() { }

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
     * Used to query the state of the X axis.
     * @returns {number} the state of the X axis
     */
    GetXAxis() {
        return navigator.getGamepads()[this.gamepadId].axes[0];
    }

    /**
     * Used to query the state of the Y axis.
     * @returns {number} the state of the Y axis
     */
    GetYAxis() {
        return navigator.getGamepads()[this.gamepadId].axes[1];
    }

    /**
     * Return the state of a button.
     * @param {number} index The index of the button.
     */
    GetButton(index) {
        return navigator.getGamepads()[this.gamepadId].buttons[index].value;
    }
}