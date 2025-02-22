(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).ChronoControl = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Plugin = /*#__PURE__*/function () {
  function Plugin(game) {
    _classCallCheck(this, Plugin);
    this.game = game; // Store the reference to the game logic
    this.name = 'Plugin'; // make name required to be set?
    // registers itself in event emitter?
  }
  _createClass(Plugin, [{
    key: "init",
    value: function init() {
      throw new Error('Method "init" must be implemented');
    }
  }, {
    key: "update",
    value: function update(deltaTime, snapshot) {
      throw new Error('Method "update" must be implemented');
    }
  }, {
    key: "render",
    value: function render() {
      // throw new Error('Method "render" must be implemented');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // throw new Error('Method "destroy" must be implemented');
    }
  }]);
  return Plugin;
}();
var _default = exports["default"] = Plugin;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _Plugin2 = _interopRequireDefault(require("../../Plugin.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ChronoControl = /*#__PURE__*/function (_Plugin) {
  _inherits(ChronoControl, _Plugin);
  var _super = _createSuper(ChronoControl);
  function ChronoControl(game) {
    var _this;
    _classCallCheck(this, ChronoControl);
    _this = _super.call(this, game);
    _this.game = game;
    _this.id = ChronoControl.id;
    _this.gameStates = []; // Array to store game states
    _this.maxStates = 1000; // Maximum number of states to store
    _this.isPaused = false; // Flag to indicate if the game is paused
    return _this;
  }
  _createClass(ChronoControl, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem(this.id, this);
    }

    // Called every game loop
  }, {
    key: "update",
    value: function update() {
      if (this.isPaused) return; // Skip updates if the game is paused

      // Clone and store the current game data
      var currentGameState = this.game.data;

      // Add the cloned state to the gameStates array
      this.gameStates.push(currentGameState);

      // Ensure the gameStates array does not exceed maxStates
      if (this.gameStates.length > this.maxStates) {
        this.gameStates.shift(); // Remove the oldest state
      }
    }

    // Starts the game loop
  }, {
    key: "start",
    value: function start() {
      var game = this.game;
      console.log('ChronoControl starting game', game);
      game.start();
    }

    // Stops the game loop
  }, {
    key: "stop",
    value: function stop() {
      var game = this.game;
      console.log('ChronoControl stopping game', game);
      game.stop();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.isPaused = true;
      this.game.paused = true;
      console.log('Game paused');
    }
  }, {
    key: "resume",
    value: function resume() {
      this.isPaused = false;
      this.game.paused = false;
      console.log('Game resumed');
    }

    // Sets the game's frames per second
  }, {
    key: "setFPS",
    value: function setFPS(fps) {
      // Implementation for setting FPS
    }

    // Rewinds the game by a specified amount
  }, {
    key: "rewind",
    value: function rewind(ticks) {
      // Implementation for rewinding the game
      // console.log('rewind', ticks)
      /*
      TODO: Have update() loop handle rewinding
      let snapshots = this.gameStates;
      snapshots.forEach(function (state) {
        for (let eId in state.ents._) {
          let ent = state.ents._[eId];
          let shallowEnt = {
            id: ent.id,
            type: ent.type,
            position: ent.position,
            rotation: ent.rotation,
            width: ent.width,
            height: ent.height,
          };
          // console.log('shallowEnt', shallowEnt)
          game.inflateEntity(shallowEnt);
        }
      });
      */
    }

    // Fast forwards the game by a specified amount
  }, {
    key: "fastForward",
    value: function fastForward(time) {
      // Implementation for fast-forwarding the game
    }

    // Method to handle any cleanup or resource management
  }, {
    key: "dispose",
    value: function dispose() {
      // Cleanup resources here
    }
  }]);
  return ChronoControl;
}(_Plugin2["default"]);
_defineProperty(ChronoControl, "id", 'chrono-control');
var _default = exports["default"] = ChronoControl;

},{"../../Plugin.js":1}]},{},[2])(2)
});
