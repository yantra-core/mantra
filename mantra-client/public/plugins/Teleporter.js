(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.PLUGINS || (g.PLUGINS = {})).Teleporter = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Teleporter.js - Marak Squires 2024
var Teleporter = exports["default"] = /*#__PURE__*/function () {
  function Teleporter() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Teleporter);
    this.id = Teleporter.id;
  }
  _createClass(Teleporter, [{
    key: "init",
    value: function init(game) {
      this.game = game;
      this.game.systemsManager.addSystem('teleporter', this);
    }
  }, {
    key: "build",
    value: function build() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }
      entityData.destination = entityData.destination || {
        position: {
          x: 0,
          y: 0,
          z: 0
        }
      };
      if (typeof entityData.url !== 'undefined') {
        entityData.destination.url = entityData.url;
      }
      entityData.meta = entityData.meta || {};

      //
      // Click to teleport
      //
      if (entityData.clickToTeleport !== false || entityData.meta.clickToTeleport !== false) {
        // default behavior is true, click to teleport
        entityData.pointerdown = entityData.pointerdown || this.pointerdownWrap.bind(this);
      }
      var style = {};
      if (entityData.clickToTeleport !== false) {
        style = {
          cursor: 'pointer'
        };
      }
      return {
        type: 'TELEPORTER',
        texture: {
          sheet: 'loz_spritesheet',
          sprite: 'ayyoDoor'
          // frame: 0 // TODO: support single frame / bypass animation of array
        },

        meta: {
          destination: entityData.destination
        },
        //texture: 'teleporter',
        //color: 0xff0000,
        pointerdown: entityData.pointerdown || this.pointerdownWrap.bind(this),
        collisionStart: entityData.collisionStart || this.touchedTeleporter.bind(this),
        style: style,
        size: {
          width: 16,
          height: 16,
          depth: 16
        },
        isStatic: true,
        position: {
          x: 0,
          y: 0,
          z: 1
        }
      };
    }
  }, {
    key: "createEntity",
    value: function createEntity() {
      var entityData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof entityData.position === 'undefined') {
        entityData.position = {
          x: 0,
          y: 0
        };
      }
      // Create the Teleporter entity
      var teleporter = game.createEntity(this.build(entityData));
    }

    // TODO: unified function signature for mantra pointer events and collision events
  }, {
    key: "pointerdownWrap",
    value: function pointerdownWrap(context, event) {
      // teleport expects a Collision.js event, not a pointer event
      // TODO: refactor to use a single event signature
      // NOTE: swap owner and target, since the owner of pointer event is probably Player, not Teleporter 
      this.touchedTeleporter(null, null, event, {
        target: context.owner,
        // owner from pointerdown is the owner of the event ( usually Player )
        owner: context.target,
        // target from pointerdown is the target of the event ( usually what was clicked on )
        event: event
      });
    }

    // TODO: Unifiy context signature from collisions
    // TODO: map context.buttons.LEFT against entityData.clickToTeleport existence
    //       in order to enable only left click to teleport, not other pointer downs
  }, {
    key: "touchedTeleporter",
    value: function touchedTeleporter(a, b, pair, context) {
      var game = this.game;
      if (context.owner.meta && context.owner.meta.destination) {
        var destination = context.owner.meta.destination;
        if (typeof destination === 'function') {
          // remark why the if/else here? refactor
          destination.call(game, context.target, context.owner);
        } else {
          if (typeof destination.url !== 'undefined') {
            if (context.target.type === 'PLAYER') {
              // could be other types as well
              // this page is inside an iframe, change the parent url to this url
              // Remark: we'll want to make this behavior configurable
              // Some users may wish for their embeds to not update parent window by default
              if (window.parent !== window) {
                window.parent.location = destination.url;
                return;
              }
              // redirect the entire page to this url
              window.location = destination.url;
            }
            return;
          }
          if (typeof destination.world !== 'undefined') {
            if (context.target.type === 'PLAYER') {
              // could be other types as well
              game.switchWorlds(destination.world);
            }
          }
          // same as world, duplicate code
          if (typeof destination.plugin !== 'undefined') {
            if (context.target.type === 'PLAYER') {
              // could be other types as well
              game.switchWorlds(destination.plugin);
            }
          }
          // handle entity case
          if (typeof destination.entity !== 'undefined') {
            // get latest position for ent ( if available )
            var ent = game.data.ents._[destination.entity]; // TODO: game.getEntity() with improved perf
            if (ent) {
              game.setPosition(context.target.id, {
                x: ent.position.x,
                y: ent.position.y
              });
            }
          }
          if (typeof destination.position !== 'undefined') {
            game.setPosition(context.target.id, {
              x: destination.position.x,
              y: destination.position.y
            });
          }
        }
      }
    }
  }]);
  return Teleporter;
}();
_defineProperty(Teleporter, "id", 'teleporter');

},{}]},{},[1])(1)
});
