'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Controller = function () {
    function Controller() {
        classCallCheck(this, Controller);

        this._onFireListeners = [];
    }

    /**
     * Used to query the state of the turning axis.
     * @returns {number} the state of the turning axis
     */


    createClass(Controller, [{
        key: "GetTurningAxis",
        value: function GetTurningAxis() {}

        /**
         * 
         * @param {() => void} listener 
         */

    }, {
        key: "AddOnFireListener",
        value: function AddOnFireListener(listener) {
            this._onFireListeners.push(listener);
        }
    }]);
    return Controller;
}();

var GamepadController = function (_Controller) {
    inherits(GamepadController, _Controller);

    /**
     * Creates a new gamepad controller.
     * @param {number} gamepadId The id of the gamepad
     */
    function GamepadController(gamepadId) {
        classCallCheck(this, GamepadController);

        var _this = possibleConstructorReturn(this, (GamepadController.__proto__ || Object.getPrototypeOf(GamepadController)).call(this));

        _this.gamepadId = gamepadId;

        setInterval(function () {
            var gp = navigator.getGamepads()[_this.gamepadId];
            if (gp.buttons[0].pressed) {
                _this._onFireListeners.forEach(function (value) {
                    return value();
                });
            }
        }, 1000 / 60);
        return _this;
    }

    /**
     * Used to query the state of the turning axis.
     * @returns {number} the state of the turning axis
     */


    createClass(GamepadController, [{
        key: "GetTurningAxis",
        value: function GetTurningAxis() {
            var gp = navigator.getGamepads()[this.gamepadId];
            return -gp.buttons[6].value + gp.buttons[7].value;
        }
    }]);
    return GamepadController;
}(Controller);

var KeyboardController = function (_Controller2) {
    inherits(KeyboardController, _Controller2);

    function KeyboardController() {
        classCallCheck(this, KeyboardController);

        var _this2 = possibleConstructorReturn(this, (KeyboardController.__proto__ || Object.getPrototypeOf(KeyboardController)).call(this));

        _this2.state = {
            right: false,
            left: false,
            fire: false
        };

        document.addEventListener("keydown", _this2.OnKeyDown.bind(_this2));
        document.addEventListener("keyup", _this2.OnKeyUp.bind(_this2));
        return _this2;
    }

    /**
     * Called when a key is pressed.
     * @param {KeyboardEvent} ev The event.
     */


    createClass(KeyboardController, [{
        key: "OnKeyDown",
        value: function OnKeyDown(ev) {
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
                    this._onFireListeners.forEach(function (value) {
                        return value();
                    });
                    break;
            }
        }

        /**
         * Called when a key is released.
         * @param {KeyboardEvent} ev The event.
         */

    }, {
        key: "OnKeyUp",
        value: function OnKeyUp(ev) {
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

    }, {
        key: "GetTurningAxis",
        value: function GetTurningAxis() {
            var tmp = 0;

            tmp -= this.state.left ? 1 : 0;
            tmp += this.state.right ? 1 : 0;

            return tmp;
        }
    }]);
    return KeyboardController;
}(Controller);

var Entity = function () {

    /**
     * An entity.
     * 
     * @param {number} x The X coordinate of the entity
     * @param {number} y The Y coordinate of the entity
     */
    function Entity(x, y) {
        classCallCheck(this, Entity);

        this.x = x;
        this.y = y;
    }

    /**
     * Used to move the entity.
     * @param {number} x What to move by on the X axis
     * @param {number} y What to move by on the Y axis
     */


    createClass(Entity, [{
        key: "Move",
        value: function Move(x, y) {
            this.x += x;
            this.y += y;
        }

        /**
         * Used to update and draw the entity.
         * @param {CanvasRenderingContext2D} canvas The canvas to render to.
         */

    }, {
        key: "Update",
        value: function Update(canvas) {}
    }]);
    return Entity;
}();

var Ship = function (_Entity) {
    inherits(Ship, _Entity);

    /**
     * An entity.
     * 
     * @param {number} x The X coordinate of the entity
     * @param {number} y The Y coordinate of the entity
     * @param {Controller} controller The controller of this ship
     */
    function Ship(x, y, controller) {
        classCallCheck(this, Ship);

        var _this = possibleConstructorReturn(this, (Ship.__proto__ || Object.getPrototypeOf(Ship)).call(this, x, y));

        _this.controller = controller;

        _this.rotation = 0;
        _this.speed = {
            x: 0,
            y: 0
        };

        _this.controller.AddOnFireListener(function () {
            console.log("Dear sir, madam. FIRE! FIRE! FIRE!");
        });
        return _this;
    }

    /**
     * Used to update the ship and apply controls.
     * @param {CanvasRenderingContext2D} canvas The canvas to render to.
     */


    createClass(Ship, [{
        key: "Update",
        value: function Update(canvas) {

            this.rotation += Math.PI / 32 * this.controller.GetTurningAxis();

            if (Math.abs(this.controller.GetTurningAxis()) > 0.1) {
                this.speed.x += Math.cos(this.rotation) * 0.5;
                this.speed.y += Math.sin(this.rotation) * 0.5;
            }

            this.speed.x -= this.speed.x / 64;
            this.speed.y -= this.speed.y / 64;

            this.Move(this.speed.x, this.speed.y);

            canvas.beginPath();
            canvas.lineTo(this.x - Math.cos(this.rotation) * 10, this.y - Math.sin(this.rotation) * 10);
            canvas.lineTo(this.x + Math.cos(this.rotation) * 10, this.y + Math.sin(this.rotation) * 10);
            canvas.stroke();
        }
    }]);
    return Ship;
}(Entity);

var Game = function () {
    function Game() {
        var _this = this;

        classCallCheck(this, Game);

        this.canvas = document.createElement("canvas");
        this.canvas.width = 1336;
        this.canvas.height = 860;
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.keyboard = true;

        this.toggleButton = document.createElement("button");
        this.toggleButton.innerText = "Controls: Keyboard";
        this.toggleButton.addEventListener("click", function (ev) {
            if (_this.keyboard) {
                _this.toggleButton.innerText = "Controls: Gamepad";
                _this.ship.controller = new GamepadController(0);
            } else {
                _this.toggleButton.innerText = "Controls: Keyboard";
                _this.ship.controller = new KeyboardController();
            }
            _this.keyboard = !_this.keyboard;
        });
        document.body.appendChild(this.toggleButton);

        this.tut = document.createElement("div");
        this.tut.innerHTML = "Press [Left arrow]/[A] to turn left and [Right arrow]/[D] to turn right.<br>You can also switch to gamepad scheme using the button bellow, which uses the top triggers on the gamepad.";
        document.body.appendChild(this.tut);

        this.ship = new Ship(500, 400, new KeyboardController(0));

        this.Update();
    }

    createClass(Game, [{
        key: "Update",
        value: function Update() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ship.Update(this.ctx);

            requestAnimationFrame(this.Update.bind(this));
        }
    }]);
    return Game;
}();

var game = new Game();
