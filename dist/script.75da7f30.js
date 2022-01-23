// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/quaternion-to-euler/index.js":[function(require,module,exports) {
"use strict";

module.exports = function(quat) {

  const q0 = quat[0];
  const q1 = quat[1];
  const q2 = quat[2];
  const q3 = quat[3];

  const Rx = Math.atan2(2 * (q0 * q1 + q2 * q3), 1 - (2 * (q1 * q1 + q2 * q2)));
  const Ry = Math.asin(2 * (q0 * q2 - q3 * q1));
  const Rz = Math.atan2(2 * (q0 * q3 + q1 * q2), 1 - (2  * (q2 * q2 + q3 * q3)));

  const euler = [Rx, Ry, Rz];

  return(euler);
};
},{}],"script.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var qte = require('quaternion-to-euler');

var Position = /*#__PURE__*/_createClass(function Position(x, y) {
  _classCallCheck(this, Position);

  this.x = x;
  this.y = y;
});

var Block = /*#__PURE__*/function () {
  function Block(x, y) {
    _classCallCheck(this, Block);

    this.x = x;
    this.y = y;
    var block = document.createElement("div");
    block.setAttribute("class", "block");
    $(block).append("<div class='inner-tile'><div class='inner-inner-tile'></div></div>");
    this.element = block;
  }

  _createClass(Block, [{
    key: "init",
    value: function init() {
      $("#board").append(this.element);
    }
  }, {
    key: "render",
    value: function render() {
      $(this.element).css({
        left: this.y * $(this.element).innerWidth() + "px",
        top: this.x * $(this.element).innerHeight() + "px"
      });
    }
  }, {
    key: "fall",
    value: function fall() {
      this.x += 1;
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      this.y += 1;
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      this.y -= 1;
    }
  }, {
    key: "rightPosition",
    value: function rightPosition() {
      return new Position(this.x, this.y + 1);
    }
  }, {
    key: "leftPosition",
    value: function leftPosition() {
      return new Position(this.x, this.y - 1);
    }
  }, {
    key: "getPosition",
    value: function getPosition() {
      return new Position(this.x, this.y);
    }
  }, {
    key: "flash",
    value: function flash() {
      return window.animatelo.flash(this.element, {
        duration: 500
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      $(this.element).remove();
    }
  }]);

  return Block;
}();

var Shape = /*#__PURE__*/function () {
  function Shape(blocks) {
    _classCallCheck(this, Shape);

    this.blocks = blocks;
  }

  _createClass(Shape, [{
    key: "getBlocks",
    value: function getBlocks() {
      return Array.from(this.blocks);
    }
  }, {
    key: "init",
    value: function init() {
      var _iterator = _createForOfIteratorHelper(this.blocks),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var block = _step.value;
          block.init();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _iterator2 = _createForOfIteratorHelper(this.blocks),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var block = _step2.value;
          block.render();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }, {
    key: "fallingPositions",
    value: function fallingPositions() {
      return this.blocks.map(function (b) {
        return b.getPosition();
      }).map(function (p) {
        return new Position(p.x + 1, p.y);
      });
    }
  }, {
    key: "fall",
    value: function fall() {
      var _iterator3 = _createForOfIteratorHelper(this.blocks),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var block = _step3.value;
          block.fall();
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "rightPositions",
    value: function rightPositions() {
      return this.blocks.map(function (b) {
        return b.rightPosition();
      });
    }
  }, {
    key: "leftPositions",
    value: function leftPositions() {
      return this.blocks.map(function (b) {
        return b.leftPosition();
      });
    }
  }, {
    key: "moveRight",
    value: function moveRight() {
      var _iterator4 = _createForOfIteratorHelper(this.blocks),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var block = _step4.value;
          block.moveRight();
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "moveLeft",
    value: function moveLeft() {
      var _iterator5 = _createForOfIteratorHelper(this.blocks),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var block = _step5.value;
          block.moveLeft();
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      var _iterator6 = _createForOfIteratorHelper(this.blocks),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var block = _step6.value;
          block.destroy();
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      this.blocks = [];
    }
  }, {
    key: "addBlocks",
    value: function addBlocks(blocks) {
      var _iterator7 = _createForOfIteratorHelper(blocks),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var block = _step7.value;
          this.blocks.push(block);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  }, {
    key: "rotate",
    value: function rotate() {//do nothing
    }
  }, {
    key: "rotatePositions",
    value: function rotatePositions() {//do nothing
    }
  }]);

  return Shape;
}();

var Square = /*#__PURE__*/function (_Shape) {
  _inherits(Square, _Shape);

  var _super = _createSuper(Square);

  function Square(x, y) {
    _classCallCheck(this, Square);

    var blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x, y + 1));
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x + 1, y + 1));
    return _super.call(this, blocks);
  }

  return _createClass(Square);
}(Shape);

var LShape = /*#__PURE__*/function (_Shape2) {
  _inherits(LShape, _Shape2);

  var _super2 = _createSuper(LShape);

  function LShape(x, y) {
    var _this;

    _classCallCheck(this, LShape);

    var blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x - 1, y));
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x + 1, y + 1));
    _this = _super2.call(this, blocks);
    _this.position = 0;
    return _this;
  }

  _createClass(LShape, [{
    key: "rotate",
    value: function rotate() {
      var blocks = this.rotatePositions().map(function (p) {
        return new Block(p.x, p.y);
      });
      this.clear();
      this.addBlocks(blocks);
      this.position = this.getNextPosition();
    }
  }, {
    key: "rotatePositions",
    value: function rotatePositions() {
      var pos = this.getBlocks().shift().getPosition();
      var x = pos.x;
      var y = pos.y;
      var positions = [];

      switch (this.getNextPosition()) {
        case 0:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x - 1, y));
            positions.push(new Position(x + 1, y));
            positions.push(new Position(x + 1, y + 1));
          }
          break;

        case 1:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x, y - 1));
            positions.push(new Position(x, y + 1));
            positions.push(new Position(x + 1, y - 1));
          }
          break;

        case 2:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x - 1, y - 1));
            positions.push(new Position(x - 1, y));
            positions.push(new Position(x + 1, y));
          }
          break;

        case 3:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x, y - 1));
            positions.push(new Position(x, y + 1));
            positions.push(new Position(x - 1, y + 1));
          }
          break;
      }

      return positions;
    }
  }, {
    key: "getNextPosition",
    value: function getNextPosition() {
      return (this.position + 1) % 4;
    }
  }]);

  return LShape;
}(Shape);

var TShape = /*#__PURE__*/function (_Shape3) {
  _inherits(TShape, _Shape3);

  var _super3 = _createSuper(TShape);

  function TShape(x, y) {
    var _this2;

    _classCallCheck(this, TShape);

    var blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x, y - 1));
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x, y + 1));
    _this2 = _super3.call(this, blocks);
    _this2.position = 0;
    return _this2;
  }

  _createClass(TShape, [{
    key: "rotate",
    value: function rotate() {
      var blocks = this.rotatePositions().map(function (p) {
        return new Block(p.x, p.y);
      });
      this.clear();
      this.addBlocks(blocks);
      this.position = this.getNextPosition();
    }
  }, {
    key: "rotatePositions",
    value: function rotatePositions() {
      var pos = this.getBlocks().shift().getPosition();
      var x = pos.x;
      var y = pos.y;
      var positions = [];

      switch (this.getNextPosition()) {
        case 0:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x, y - 1));
            positions.push(new Position(x + 1, y));
            positions.push(new Position(x, y + 1));
          }
          break;

        case 1:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x - 1, y));
            positions.push(new Position(x, y - 1));
            positions.push(new Position(x + 1, y));
          }
          break;

        case 2:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x, y - 1));
            positions.push(new Position(x - 1, y));
            positions.push(new Position(x, y + 1));
          }
          break;

        case 3:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x - 1, y));
            positions.push(new Position(x, y + 1));
            positions.push(new Position(x + 1, y));
          }
          break;
      }

      return positions;
    }
  }, {
    key: "getNextPosition",
    value: function getNextPosition() {
      return (this.position + 1) % 4;
    }
  }]);

  return TShape;
}(Shape);

var ZShape = /*#__PURE__*/function (_Shape4) {
  _inherits(ZShape, _Shape4);

  var _super4 = _createSuper(ZShape);

  function ZShape(x, y) {
    var _this3;

    _classCallCheck(this, ZShape);

    var blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x, y - 1));
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x + 1, y + 1));
    _this3 = _super4.call(this, blocks);
    _this3.position = 0;
    return _this3;
  }

  _createClass(ZShape, [{
    key: "rotate",
    value: function rotate() {
      var blocks = this.rotatePositions().map(function (p) {
        return new Block(p.x, p.y);
      });
      this.clear();
      this.addBlocks(blocks);
      this.position = this.getNextPosition();
    }
  }, {
    key: "rotatePositions",
    value: function rotatePositions() {
      var pos = this.getBlocks().shift().getPosition();
      var x = pos.x;
      var y = pos.y;
      var positions = [];

      switch (this.getNextPosition()) {
        case 0:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x, y - 1));
            positions.push(new Position(x + 1, y));
            positions.push(new Position(x + 1, y + 1));
          }
          break;

        case 1:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x - 1, y));
            positions.push(new Position(x, y - 1));
            positions.push(new Position(x + 1, y - 1));
          }
          break;
      }

      return positions;
    }
  }, {
    key: "getNextPosition",
    value: function getNextPosition() {
      return (this.position + 1) % 2;
    }
  }]);

  return ZShape;
}(Shape);

var Line = /*#__PURE__*/function (_Shape5) {
  _inherits(Line, _Shape5);

  var _super5 = _createSuper(Line);

  function Line(x, y) {
    var _this4;

    _classCallCheck(this, Line);

    var blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x - 1, y));
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x + 2, y));
    _this4 = _super5.call(this, blocks);
    _this4.position = 0;
    return _this4;
  }

  _createClass(Line, [{
    key: "rotate",
    value: function rotate() {
      var blocks = this.rotatePositions().map(function (p) {
        return new Block(p.x, p.y);
      });
      this.clear();
      this.addBlocks(blocks);
      this.position = this.getNextPosition();
    }
  }, {
    key: "rotatePositions",
    value: function rotatePositions() {
      var pos = this.getBlocks().shift().getPosition();
      var x = pos.x;
      var y = pos.y;
      var positions = [];

      switch (this.getNextPosition()) {
        case 0:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x - 1, y));
            positions.push(new Position(x + 1, y));
            positions.push(new Position(x + 2, y));
          }
          break;

        case 1:
          {
            positions.push(new Position(x, y));
            positions.push(new Position(x, y - 1));
            positions.push(new Position(x, y + 1));
            positions.push(new Position(x, y + 2));
          }
          break;
      }

      return positions;
    }
  }, {
    key: "getNextPosition",
    value: function getNextPosition() {
      return (this.position + 1) % 2;
    }
  }]);

  return Line;
}(Shape);

var Board = /*#__PURE__*/function () {
  function Board() {
    _classCallCheck(this, Board);

    this.blocks = [];
    this.shapes = [];
    this.interval = undefined;
    this.loopInterval = 1000;
    this.gameOver = true;
    this.loopIntervalFast = parseInt(1000 / 27);
    this.init();
    this.score = 0;
    console.log("DEBUG", "Board", "construct() - new");
  }

  _createClass(Board, [{
    key: "setScore",
    value: function setScore(value) {
      this.score = value;
      $("#score").text(this.score);
    }
  }, {
    key: "getScore",
    value: function getScore() {
      return this.score;
    }
  }, {
    key: "init",
    value: function init() {
      console.log("DEBUG", "Board", "init()"); // Connect to Myo Armband

      Myo.connect('');
      Myo.on('connected', function () {
        var connectStatus = document.getElementById('connect-status');
        connectStatus.innerText = 'connected';
        console.log('connected!', this.id);
        Myo.setLockingPolicy('none'); // Myo.setLockingPolicy('standard');
      });

      Myo.onError = function () {
        var connectStatus = document.getElementById('connect-status');
        connectStatus.innerText = 'disconnected';
        console.log("Woah, couldn't connect to Myo Connect");
      };

      $(".empty").each(function (index, ele) {
        var x = parseInt(index / 10);
        var y = index % 10;
        $(ele).css({
          left: y * $(ele).innerWidth() + "px",
          top: x * $(ele).innerHeight() + "px"
        });
      });
      $("#message").text("Tetris");
      window.animatelo.flash("#new-game", {
        duration: 2500,
        iterations: Infinity
      });
    }
  }, {
    key: "newGame",
    value: function newGame() {
      var _iterator8 = _createForOfIteratorHelper(this.shapes),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var shape = _step8.value;
          this.removeShape(shape);
          this.addBlocks(shape.getBlocks());
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      var _iterator9 = _createForOfIteratorHelper(this.blocks),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var block = _step9.value;
          block.destroy();
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      this.blocks = [];
      this.gameOver = false;
      this.initGameLoop(this.loopInterval);
      this.setScore(0);
      $("#banner").hide();
    }
  }, {
    key: "initGameLoop",
    value: function initGameLoop(value) {
      if (this.interval) {
        clearInterval(this.interval);
      }

      var ref = this;
      this.interval = setInterval(function () {
        ref.gameLoop();
      }, value);
    }
  }, {
    key: "gameLoop",
    value: function gameLoop() {
      this.renderShapes();
      this.renderBlocks();
      this.spawnShapes();
      this.gameUpdate();
      console.log("Shapes Length:" + this.shapes.length);
      console.log("Blocks Length:" + this.blocks.length);
    }
  }, {
    key: "gameUpdate",
    value: function gameUpdate() {
      if (this.isGameOver()) {
        this.gameOver = true;

        if (this.interval) {
          clearInterval(this.interval);
          this.interval = undefined;
        }

        $("#banner").show();
        $("#message").text("Game Over!");
        $("#new-game").text("Tap here to start again!");
      }
    }
  }, {
    key: "isGameOver",
    value: function isGameOver() {
      var _iterator10 = _createForOfIteratorHelper(this.blocks),
          _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var block = _step10.value;
          var pos = block.getPosition();

          if (pos.x === 0 && pos.y === 4) {
            return true;
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }

      return false;
    }
  }, {
    key: "renderShapes",
    value: function renderShapes() {
      var _iterator11 = _createForOfIteratorHelper(this.getShapes()),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var shape = _step11.value;

          if (this.arePositonsWithinBoard(shape.fallingPositions()) && this.areBlocksEmpty(shape.fallingPositions())) {
            shape.fall();
            shape.render();
          } else {
            this.removeShape(shape);
            this.addBlocks(shape.getBlocks());

            if (this.moveFast) {
              this.initGameLoop(this.loopInterval);
              this.moveFast = false;
            }
          }
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }
    }
  }, {
    key: "dropShape",
    value: function dropShape() {
      if (!this.gameOver) {
        this.initGameLoop(this.loopIntervalFast);
        this.moveFast = true;
      }
    }
  }, {
    key: "renderBlocks",
    value: function renderBlocks() {
      var _this5 = this;

      var _loop = function _loop(x) {
        var blocks = [];

        for (var y = 0; y < 10; y++) {
          var block = _this5.getBlock(x, y);

          if (!block) {
            break;
          }

          blocks.push(block);
        }

        if (blocks.length == 10) {
          var ref = _this5;

          _this5.removeBlocks(blocks);

          _this5.flashBlocks(blocks, function () {
            ref.destroyBlocks(blocks);
            ref.fallBlocks(x);
            ref.setScore(ref.getScore() + 10);
          });
        }
      };

      for (var x = 0; x < 16; x++) {
        _loop(x);
      }
    }
  }, {
    key: "flashBlocks",
    value: function flashBlocks(blocks, callback) {
      var anim = null;

      var _iterator12 = _createForOfIteratorHelper(blocks),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var block = _step12.value;
          anim = block.flash();
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }

      anim[0].onfinish = callback;
    }
  }, {
    key: "fallBlocks",
    value: function fallBlocks(i) {
      for (var x = 0; x < i; x++) {
        for (var y = 0; y < 10; y++) {
          var block = this.getBlock(x, y);

          if (block) {
            block.fall();
            block.render();
          }
        }
      }
    }
  }, {
    key: "removeBlocks",
    value: function removeBlocks(blocks) {
      var _iterator13 = _createForOfIteratorHelper(blocks),
          _step13;

      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var block = _step13.value;
          this.blocks.splice(this.blocks.indexOf(block), 1);
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
    }
  }, {
    key: "destroyBlocks",
    value: function destroyBlocks(blocks) {
      var _iterator14 = _createForOfIteratorHelper(blocks),
          _step14;

      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var block = _step14.value;
          block.destroy();
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }
    }
  }, {
    key: "getBlock",
    value: function getBlock(x, y) {
      var _iterator15 = _createForOfIteratorHelper(this.blocks),
          _step15;

      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var block = _step15.value;

          if (block.x == x && block.y == y) {
            return block;
          }
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }

      return undefined;
    }
  }, {
    key: "spawnShapes",
    value: function spawnShapes() {
      if (this.shapes.length == 0) {
        var shape = null;

        switch (this.getRandomRange(0, 4)) {
          case 0:
            {
              shape = new Line(0, 4);
            }
            break;

          case 1:
            {
              shape = new Square(0, 4);
            }
            break;

          case 2:
            {
              shape = new LShape(0, 4);
            }
            break;

          case 3:
            {
              shape = new ZShape(0, 4);
            }
            break;

          case 4:
            {
              shape = new TShape(0, 4);
            }
            break;
        }

        shape.init();
        shape.render();
        this.shapes.push(shape);
      }
    }
  }, {
    key: "getShapes",
    value: function getShapes() {
      return Array.from(this.shapes);
    }
  }, {
    key: "removeShape",
    value: function removeShape(shape) {
      this.shapes.splice(this.shapes.indexOf(shape), 1);
    }
  }, {
    key: "addBlocks",
    value: function addBlocks(blocks) {
      var _iterator16 = _createForOfIteratorHelper(blocks),
          _step16;

      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var block = _step16.value;
          this.blocks.push(block);
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
      }
    }
  }, {
    key: "arePositonsWithinBoard",
    value: function arePositonsWithinBoard(positions) {
      var _iterator17 = _createForOfIteratorHelper(positions),
          _step17;

      try {
        for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
          var position = _step17.value;

          if (position.x >= 16 || position.y < 0 || position.y >= 10) {
            return false;
          }
        }
      } catch (err) {
        _iterator17.e(err);
      } finally {
        _iterator17.f();
      }

      return true;
    }
  }, {
    key: "areBlocksEmpty",
    value: function areBlocksEmpty(positions) {
      var _iterator18 = _createForOfIteratorHelper(positions),
          _step18;

      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var position = _step18.value;

          var _iterator19 = _createForOfIteratorHelper(this.blocks),
              _step19;

          try {
            for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
              var block = _step19.value;
              var pos = block.getPosition();

              if (pos.x == position.x && pos.y == position.y) {
                return false;
              }
            }
          } catch (err) {
            _iterator19.e(err);
          } finally {
            _iterator19.f();
          }
        }
      } catch (err) {
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }

      return true;
    }
  }, {
    key: "leftKeyPress",
    value: function leftKeyPress() {
      var _iterator20 = _createForOfIteratorHelper(this.shapes),
          _step20;

      try {
        for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
          var shape = _step20.value;

          if (this.arePositonsWithinBoard(shape.leftPositions()) && this.areBlocksEmpty(shape.leftPositions())) {
            shape.moveLeft();
            shape.render();
          }
        }
      } catch (err) {
        _iterator20.e(err);
      } finally {
        _iterator20.f();
      }
    }
  }, {
    key: "rotate",
    value: function rotate() {
      var _iterator21 = _createForOfIteratorHelper(this.shapes),
          _step21;

      try {
        for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
          var shape = _step21.value;
          if (this.arePositonsWithinBoard(shape.rotatePositions()) && this.areBlocksEmpty(shape.rotatePositions())) shape.rotate();
          shape.init();
          shape.render();
        }
      } catch (err) {
        _iterator21.e(err);
      } finally {
        _iterator21.f();
      }
    }
  }, {
    key: "rightKeyPress",
    value: function rightKeyPress() {
      var _iterator22 = _createForOfIteratorHelper(this.shapes),
          _step22;

      try {
        for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
          var shape = _step22.value;

          if (this.arePositonsWithinBoard(shape.rightPositions()) && this.areBlocksEmpty(shape.rightPositions())) {
            shape.moveRight();
            shape.render();
          }
        }
      } catch (err) {
        _iterator22.e(err);
      } finally {
        _iterator22.f();
      }
    }
  }, {
    key: "upKeyPress",
    value: function upKeyPress() {
      this.rotate();
    }
  }, {
    key: "downKeyPress",
    value: function downKeyPress() {
      this.dropShape();
    }
  }, {
    key: "getRandomRange",
    value: function getRandomRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }]);

  return Board;
}();

var board = new Board();
$(document).keydown(function (e) {
  switch (e.which) {
    case 37:
      // left
      board.leftKeyPress();
      break;

    case 38:
      // up
      board.upKeyPress();
      break;

    case 39:
      // right
      board.rightKeyPress();
      break;

    case 40:
      // down
      board.downKeyPress();
      break;

    case 78:
      // n
      board.newGame();
      break;

    default:
      console.log(e.which);
      break;
    // exit this handler for other keys
  }

  e.preventDefault(); // prevent the default action (scroll / move caret)
});
Myo.on('fist', function () {
  console.log('Rotate!'); // this.vibrate();

  board.upKeyPress();
}); // Myo.on('double_tap', function(){  
//   console.log('Rotate!');
//   // this.vibrate();
//   board.upKeyPress();
// });

Myo.on('wave_in', function () {
  console.log('Move left!'); // this.vibrate();

  board.leftKeyPress();
});
Myo.on('wave_out', function () {
  console.log('Move right!'); // this.vibrate();

  board.rightKeyPress();
});
Myo.on('fingers_spread', function () {
  console.log('Speed up!'); // this.vibrate();

  board.downKeyPress();
}); // let arrayOriX = [];
// let arrayOriY = [];
// let arrayOriZ = [];
// let arrayOriW = [];
// let arrayGyrX = [];
// let arrayGyrY = [];
// let arrayGyrZ = [];
// let arrayAccX = [];
// let arrayAccY = [];
// let arrayAccZ = [];

Myo.on('imu', function (data) {
  // console.log("imu",data.accelerometer);
  // let oriX = data.orientation['x'];
  // let oriY = data.orientation['y'];
  // let oriZ = data.orientation['z'];
  // let oriW = data.orientation['W'];
  // let gyrX = data.gyroscope['x'];
  // let gyrY = data.gyroscope['y'];
  // let gyrZ = data.gyroscope['z'];
  // let accX = data.accelerometer['x'];
  // let accY = data.accelerometer['y'];
  // let accZ = data.accelerometer['z'];
  var ori = document.getElementById('ori');
  ori.innerText = JSON.stringify(data.orientation, null, 4);
  var quat = [data.orientation.x, data.orientation.y, data.orientation.z, data.orientation.w];
  var euler = qte(quat);
  ori.innerText += "\nEuler (rad): \n" + JSON.stringify(euler, null, 4);
  ori.innerText += "\nEuler (°): \n" + JSON.stringify(euler.map(function (n) {
    return n * 180 / Math.PI;
  }), null, 4);
  var gyr = document.getElementById('gyr');
  gyr.innerText = JSON.stringify(data.gyroscope, null, 4);
  var acc = document.getElementById('acc');
  acc.innerText = JSON.stringify(data.accelerometer, null, 4); // arrayOriX.push(oriX);
  // arrayOriY.push(oriY);
  // arrayOriZ.push(oriZ);
  // arrayOriW.push(oriW);
  // arrayGyrX.push(gyrX);
  // arrayGyrY.push(gyrY);
  // arrayGyrZ.push(gyrZ);
  // arrayAccX.push(accX);
  // arrayAccY.push(accY);
  // arrayAccZ.push(accZ);
  // if(arrayOriX.length > 100) {
  //   arrayOriX.shift();
  // }
  // if(arrayOriY.length > 100) {
  //   arrayOriY.shift();
  // }
  // if(arrayOriZ.length > 100) {
  //   arrayOriZ.shift();
  // }
  // if(arrayOriW.length > 100) {
  //   arrayOriW.shift();
  // }
  // if(arrayGyrX.length > 100) {
  //   arrayGyrX.shift();
  // }
  // if(arrayGyrY.length > 100) {
  //   arrayGyrY.shift();
  // }
  // if(arrayGyrZ.length > 100) {
  //   arrayGyrZ.shift();
  // }
  // if(arrayAccX.length > 100) {
  //   arrayAccX.shift();
  // }
  // if(arrayAccY.length > 100) {
  //   arrayAccY.shift();
  // }
  // if(arrayAccZ.length > 100) {
  //   arrayAccZ.shift();
  // }
  // if(accX > 0.9) {
  //   console.log('Rotate!');
  //   this.vibrate();
  //   board.upKeyPress();
  // }
  // if(accX < -0.9) {
  //   console.log('Speed up!');
  //   this.vibrate();
  //   board.downKeyPress();
  // }
  // if(accY < -0.2) {
  //   console.log('Move left!');
  //   this.vibrate();
  //   board.leftKeyPress();
  // }
  // if(accY > 0.2) {
  //   console.log('Move right!');
  //   this.vibrate();
  //   board.rightKeyPress();
  // }
}); // setInterval(function() {
//   let counterRotate = 0;
//   let counterSpeedUp = 0;
//   let counterLeft = 0;
//   let counterRight = 0;
//   console.log('bewergen test');
//   arrayOriY.forEach(function(item) {
//     if(item < -0.5) {
//       counterRotate += 1;
//     }
//     if(item > 0.5) {
//       counterSpeedUp += 1;
//     }
//   });
//   if(counterRotate > 50) {
//     console.log('Rotate!');
//     // this.vibrate();
//     board.upKeyPress();
//     counterRotate = 0;
//   }
//   if(counterSpeedUp > 50) {
//     console.log('Speed up!');
//     // this.vibrate();
//     board.downKeyPress();
//     counterSpeedUp = 0;
//   }
//   // arrayAccY.forEach(function(item) {
//   //   if(item < -0.2) {
//   //     counterLeft += 1;
//   //   }
//   //   if(item > 0.2) {
//   //     counterRight += 1;
//   //   }
//   // });
//   // if(counterLeft > 50) {
//   //   console.log('Move left!');
//   //   // this.vibrate();
//   //   board.leftKeyPress();
//   //   counterLeft = 0;
//   // }
//   // if(counterRight > 50) {
//   //   console.log('Move right!');
//   //   // this.vibrate();
//   //   board.rightKeyPress();
//   //   counterRight = 0;
//   // }
// }, 500);

$("#new-game").click(function () {
  board.newGame();
});
$("#down").click(function () {
  board.downKeyPress();
});
$("#rotate").click(function () {
  board.upKeyPress();
});
$("#left").click(function () {
  board.leftKeyPress();
});
$("#right").click(function () {
  board.rightKeyPress();
});
},{"quaternion-to-euler":"../node_modules/quaternion-to-euler/index.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50618" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map