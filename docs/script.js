// var qte = require("quaternion-to-euler");

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    let block = document.createElement("div");
    block.setAttribute("class", "block");
    $(block).append("<div class='inner-tile'><div class='inner-inner-tile'></div></div>");
    this.element = block;
  }

  init() {
    $("#board").append(this.element);
  }

  render() {
    $(this.element).css({
      left: this.y * $(this.element).innerWidth() + "px",
      top: this.x * $(this.element).innerHeight() + "px",
    });
  }

  fall() {
    this.x += 1;
  }

  moveRight() {
    this.y += 1;
  }

  moveLeft() {
    this.y -= 1;
  }

  rightPosition() {
    return new Position(this.x, this.y + 1);
  }

  leftPosition() {
    return new Position(this.x, this.y - 1);
  }

  getPosition() {
    return new Position(this.x, this.y);
  }

  flash() {
    return window.animatelo.flash(this.element, {
      duration: 500,
    });
  }

  destroy() {
    $(this.element).remove();
  }
}

class Shape {
  constructor(blocks) {
    this.blocks = blocks;
  }

  getBlocks() {
    return Array.from(this.blocks);
  }

  init() {
    for (let block of this.blocks) {
      block.init();
    }
  }

  render() {
    for (let block of this.blocks) {
      block.render();
    }
  }

  fallingPositions() {
    return this.blocks.map((b) => b.getPosition()).map((p) => new Position(p.x + 1, p.y));
  }

  fall() {
    for (let block of this.blocks) {
      block.fall();
    }
  }

  rightPositions() {
    return this.blocks.map((b) => b.rightPosition());
  }

  leftPositions() {
    return this.blocks.map((b) => b.leftPosition());
  }

  moveRight() {
    for (let block of this.blocks) {
      block.moveRight();
    }
  }

  moveLeft() {
    for (let block of this.blocks) {
      block.moveLeft();
    }
  }

  clear() {
    for (let block of this.blocks) {
      block.destroy();
    }
    this.blocks = [];
  }

  addBlocks(blocks) {
    for (let block of blocks) {
      this.blocks.push(block);
    }
  }

  rotate() {
    //do nothing
  }

  rotatePositions() {
    //do nothing
  }
}

class Square extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x, y + 1));
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x + 1, y + 1));
    super(blocks);
  }
}

class LShape extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x - 1, y));
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x + 1, y + 1));
    super(blocks);
    this.position = 0;
  }

  rotate() {
    let blocks = this.rotatePositions().map((p) => new Block(p.x, p.y));
    this.clear();
    this.addBlocks(blocks);
    this.position = this.getNextPosition();
  }

  rotatePositions() {
    let pos = this.getBlocks().shift().getPosition();
    let x = pos.x;
    let y = pos.y;
    let positions = [];
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

  getNextPosition() {
    return (this.position + 1) % 4;
  }
}

class TShape extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x, y - 1));
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x, y + 1));
    super(blocks);
    this.position = 0;
  }

  rotate() {
    let blocks = this.rotatePositions().map((p) => new Block(p.x, p.y));
    this.clear();
    this.addBlocks(blocks);
    this.position = this.getNextPosition();
  }

  rotatePositions() {
    let pos = this.getBlocks().shift().getPosition();
    let x = pos.x;
    let y = pos.y;
    let positions = [];
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

  getNextPosition() {
    return (this.position + 1) % 4;
  }
}

class ZShape extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x, y - 1));
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x + 1, y + 1));
    super(blocks);
    this.position = 0;
  }

  rotate() {
    let blocks = this.rotatePositions().map((p) => new Block(p.x, p.y));
    this.clear();
    this.addBlocks(blocks);
    this.position = this.getNextPosition();
  }

  rotatePositions() {
    let pos = this.getBlocks().shift().getPosition();
    let x = pos.x;
    let y = pos.y;
    let positions = [];
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

  getNextPosition() {
    return (this.position + 1) % 2;
  }
}

class Line extends Shape {
  constructor(x, y) {
    let blocks = [];
    blocks.push(new Block(x, y));
    blocks.push(new Block(x - 1, y));
    blocks.push(new Block(x + 1, y));
    blocks.push(new Block(x + 2, y));
    super(blocks);
    this.position = 0;
  }

  rotate() {
    let blocks = this.rotatePositions().map((p) => new Block(p.x, p.y));
    this.clear();
    this.addBlocks(blocks);
    this.position = this.getNextPosition();
  }

  rotatePositions() {
    let pos = this.getBlocks().shift().getPosition();
    let x = pos.x;
    let y = pos.y;
    let positions = [];
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

  getNextPosition() {
    return (this.position + 1) % 2;
  }
}

class Board {
  constructor() {
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

  setScore(value) {
    this.score = value;
    $("#score").text(this.score);
  }

  getScore() {
    return this.score;
  }

  init() {
    console.log("DEBUG", "Board", "init()");
    // Connect to Myo Armband
    Myo.connect("");

    Myo.on("connected", function () {
      // let connectStatus = document.getElementById("connect-status");
      // connectStatus.innerText = "connected";
      console.log("connected!", this.id);
      Myo.setLockingPolicy("none");
      // Myo.setLockingPolicy('standard');
    });

    Myo.onError = function () {
      let connectStatus = document.getElementById("connect-status");
      connectStatus.innerText = "disconnected";
      console.log("Woah, couldn't connect to Myo Connect");
    };

    $(".empty").each(function (index, ele) {
      let x = parseInt(index / 10);
      let y = index % 10;
      $(ele).css({
        left: y * $(ele).innerWidth() + "px",
        top: x * $(ele).innerHeight() + "px",
      });
    });
    $("#message").text("Tetris");
    window.animatelo.flash("#new-game", {
      duration: 2500,
      iterations: Infinity,
    });
  }

  newGame() {
    for (let shape of this.shapes) {
      this.removeShape(shape);
      this.addBlocks(shape.getBlocks());
    }
    for (let block of this.blocks) {
      block.destroy();
    }
    this.blocks = [];
    this.gameOver = false;
    this.initGameLoop(this.loopInterval);
    this.setScore(0);
    $("#banner").hide();
  }

  initGameLoop(value) {
    if (this.interval) {
      clearInterval(this.interval);
    }
    let ref = this;
    this.interval = setInterval(function () {
      ref.gameLoop();
    }, value);
  }

  gameLoop() {
    this.renderShapes();
    this.renderBlocks();
    this.spawnShapes();
    this.gameUpdate();
    // console.log("Shapes Length:" + this.shapes.length);
    // console.log("Blocks Length:" + this.blocks.length);
  }

  gameUpdate() {
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

  isGameOver() {
    for (let block of this.blocks) {
      let pos = block.getPosition();
      if (pos.x === 0 && pos.y === 4) {
        return true;
      }
    }
    return false;
  }

  renderShapes() {
    for (let shape of this.getShapes()) {
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
  }

  dropShape() {
    if (!this.gameOver) {
      this.initGameLoop(this.loopIntervalFast);
      this.moveFast = true;
    }
  }

  renderBlocks() {
    for (let x = 0; x < 16; x++) {
      let blocks = [];
      for (let y = 0; y < 10; y++) {
        let block = this.getBlock(x, y);
        if (!block) {
          break;
        }
        blocks.push(block);
      }
      if (blocks.length == 10) {
        let ref = this;
        this.removeBlocks(blocks);
        this.flashBlocks(blocks, function () {
          ref.destroyBlocks(blocks);
          ref.fallBlocks(x);
          ref.setScore(ref.getScore() + 10);
        });
      }
    }
  }

  flashBlocks(blocks, callback) {
    let anim = null;
    for (let block of blocks) {
      anim = block.flash();
    }
    anim[0].onfinish = callback;
  }

  fallBlocks(i) {
    for (let x = 0; x < i; x++) {
      for (let y = 0; y < 10; y++) {
        let block = this.getBlock(x, y);
        if (block) {
          block.fall();
          block.render();
        }
      }
    }
  }

  removeBlocks(blocks) {
    for (let block of blocks) {
      this.blocks.splice(this.blocks.indexOf(block), 1);
    }
  }

  destroyBlocks(blocks) {
    for (let block of blocks) {
      block.destroy();
    }
  }

  getBlock(x, y) {
    for (let block of this.blocks) {
      if (block.x == x && block.y == y) {
        return block;
      }
    }
    return undefined;
  }

  spawnShapes() {
    if (this.shapes.length == 0) {
      let shape = null;

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

  getShapes() {
    return Array.from(this.shapes);
  }

  removeShape(shape) {
    this.shapes.splice(this.shapes.indexOf(shape), 1);
  }

  addBlocks(blocks) {
    for (let block of blocks) {
      this.blocks.push(block);
    }
  }

  arePositonsWithinBoard(positions) {
    for (let position of positions) {
      if (position.x >= 16 || position.y < 0 || position.y >= 10) {
        return false;
      }
    }
    return true;
  }

  areBlocksEmpty(positions) {
    for (let position of positions) {
      for (let block of this.blocks) {
        let pos = block.getPosition();
        if (pos.x == position.x && pos.y == position.y) {
          return false;
        }
      }
    }
    return true;
  }

  leftKeyPress() {
    for (let shape of this.shapes) {
      if (this.arePositonsWithinBoard(shape.leftPositions()) && this.areBlocksEmpty(shape.leftPositions())) {
        shape.moveLeft();
        shape.render();
      }
    }
  }

  rotate() {
    for (let shape of this.shapes) {
      if (this.arePositonsWithinBoard(shape.rotatePositions()) && this.areBlocksEmpty(shape.rotatePositions()))
        shape.rotate();
      shape.init();
      shape.render();
    }
  }

  rightKeyPress() {
    for (let shape of this.shapes) {
      if (this.arePositonsWithinBoard(shape.rightPositions()) && this.areBlocksEmpty(shape.rightPositions())) {
        shape.moveRight();
        shape.render();
      }
    }
  }

  upKeyPress() {
    this.rotate();
  }

  downKeyPress() {
    this.dropShape();
  }

  getRandomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// Initialisation

// let controlMethod = localStorage.getItem('control-method') ? localStorage.getItem('control-method') : "keyboard";

// let controlMethod = "keyboard";
// if (localStorage.getItem('control-method')) {
//   controlMethod = localStorage.getItem('control-method');
// }

// let controlMethod = localStorage.getItem('control-method') || "keyboard";

let controlMethod = "keyboard";
let leftGesture = "wave-in";
let rightGesture = "wave-out";
let rotateGesture = "fist";
let downGesture = "fingers-spread";
let lengthThreshold = 4;

let valuesLogged = false;
let board = new Board();

const KeyboardIcon = document.getElementById("keyboard-icon");
const GestureIcon = document.getElementById("gesture-icon");
const ArmIcon = document.getElementById("arm-icon");
const gestureOptions = document.getElementById("gesture-options");
KeyboardIcon.style.display = "none";
GestureIcon.style.display = "none";
ArmIcon.style.display = "none";
gestureOptions.style.display = "none";

window.requestAnimationFrame(updateTableData);
load();
updateUI();
registerHandlers();

const accelerometerCalibratedButton = document.getElementById("accelerometer-calibrate");
accelerometerCalibratedButton.addEventListener("click", calibrateAccelerometer);

// keyboard control
$(document).keydown(function (e) {
  if (controlMethod === "keyboard") {
    switch (e.which) {
      case 37: // left
        board.leftKeyPress();
        break;

      case 38: // up
        board.upKeyPress();
        break;

      case 39: // right
        board.rightKeyPress();
        break;

      case 40: // down
        board.downKeyPress();
        break;

      case 78: // n
        board.newGame();
        break;

      default:
        console.log(e.which);
        break; // exit this handler for other keys
    }    
  }
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

// make user selectable gestures for different actions
Myo.on('wave_in', function(){  
  if (controlMethod === "gesture") {
    if (leftGesture === "wave-in") {
      board.leftKeyPress();
      console.log('Move left!');
    } else if (rightGesture === "wave-in") {
      board.rightKeyPress();
      console.log('Move right!');
    } else if (rotateGesture === "wave-in") {
      board.upKeyPress();
      console.log('Rotate!');
    } else if (downGesture === "wave-in") {
      board.downKeyPress();
      console.log('Down!');
    }
  }
});

Myo.on('wave_out', function(){  
  if (controlMethod === "gesture") {
    if (leftGesture === "wave-out") {
      board.leftKeyPress();
      console.log('Move left!');
    } else if (rightGesture === "wave-out") {
      board.rightKeyPress();
      console.log('Move right!');
    } else if (rotateGesture === "wave-out") {
      board.upKeyPress();
      console.log('Rotate!');
    } else if (downGesture === "wave-out") {
      board.downKeyPress();
      console.log('Down!');
    }
  }
});

Myo.on('fist', function(){  
  if (controlMethod === "gesture") {
    if (leftGesture === "fist") {
      board.leftKeyPress();
      console.log('Move left!');
    } else if (rightGesture === "fist") {
      board.rightKeyPress();
      console.log('Move right!');
    } else if (rotateGesture === "fist") {
      board.upKeyPress();
      console.log('Rotate!');
    } else if (downGesture === "fist") {
      board.downKeyPress();
      console.log('Down!');
    }
  }
});

Myo.on('fingers_spread', function(){  
  if (controlMethod === "gesture") {
    if (leftGesture === "fingers-spread") {
      board.leftKeyPress();
      console.log('Move left!');
    } else if (rightGesture === "fingers-spread") {
      board.rightKeyPress();
      console.log('Move right!');
    } else if (rotateGesture === "fingers-spread") {
      board.upKeyPress();
      console.log('Rotate!');
    } else if (downGesture === "fingers-spread") {
      board.downKeyPress();
      console.log('Down!');
    }
  }
});

Myo.on('double_tap', function(){  
  if (controlMethod === "gesture") {
    if (leftGesture === "double-tap") {
      board.leftKeyPress();
      console.log('Move left!');
    } else if (rightGesture === "double-tap") {
      board.rightKeyPress();
      console.log('Move right!');
    } else if (rotateGesture === "double-tap") {
      board.upKeyPress();
      console.log('Rotate!');
    } else if (downGesture === "double-tap") {
      board.downKeyPress();
      console.log('Down!');
    }
  }
});

// add hide function to button
const buttonControl = document.getElementById("control");
const buttonSettings = document.getElementById("settings");
buttonControl.addEventListener("click", onClickControl);
buttonSettings.addEventListener("click", onClickSettings);

function onClickControl() {
  const control = document.getElementById("controls");
  if (control.style.display === "none") {
    control.style.display = "block";
  } else {
    control.style.display = "none";
  }
}

function onClickSettings() {
  const settings = document.getElementById("sensor-data");
  if (settings.parentElement.style.visibility === "hidden") {
    settings.parentElement.style.visibility = "visible";
  } else {
    settings.parentElement.style.visibility = "hidden";
  }
}

const sensorData = {
  accelerometer: {
    x: 0,
    y: 0,
    z: 0,
    calib: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  gyroscope: {
    x: 0,
    y: 0,
    z: 0
  },
  orientation: {
    x: 0,
    y: 0,
    z: 0,
    w: 0
  }
}

function calibrateAccelerometer() {
  sensorData.accelerometer.calib.x = sensorData.accelerometer.x;
  sensorData.accelerometer.calib.y = sensorData.accelerometer.y;
  sensorData.accelerometer.calib.z = sensorData.accelerometer.z;
}

Myo.on("imu", function (data) {
  sensorData.accelerometer.x = data.accelerometer.x;
  sensorData.accelerometer.y = data.accelerometer.y;
  sensorData.accelerometer.z = data.accelerometer.z;
  sensorData.gyroscope.x = data.gyroscope.x;
  sensorData.gyroscope.y = data.gyroscope.y;
  sensorData.gyroscope.z = data.gyroscope.z;
  sensorData.orientation.x = data.orientation.x;
  sensorData.orientation.y = data.orientation.y;
  sensorData.orientation.z = data.orientation.z;
  sensorData.orientation.w = data.orientation.w;
  // arm movement
});

// table
function updateTableData() {
  const decimalPlaces = 3;
  const tableAccX = document.getElementById("accelerometer-x");
  tableAccX.innerText = Number(sensorData.accelerometer.x).toFixed(decimalPlaces);
  const tableAccY = document.getElementById("accelerometer-y");
  tableAccY.innerText = Number(sensorData.accelerometer.y).toFixed(decimalPlaces);
  const tableAccZ = document.getElementById("accelerometer-z");
  tableAccZ.innerText = Number(sensorData.accelerometer.z).toFixed(decimalPlaces);

  const accelerometerLength = Math.sqrt(Math.pow(sensorData.accelerometer.x, 2) + Math.pow(sensorData.accelerometer.y, 2) + Math.pow(sensorData.accelerometer.z, 2));
  const tableAccLength = document.getElementById("accelerometer-length");
  tableAccLength.innerText = Number(accelerometerLength).toFixed(decimalPlaces);

  // calibrate accelerometer data
  const calibAccX = sensorData.accelerometer.x - sensorData.accelerometer.calib.x;
  const calibAccY = sensorData.accelerometer.y - sensorData.accelerometer.calib.y;
  const calibAccZ = sensorData.accelerometer.z - sensorData.accelerometer.calib.z;

  const tableAccXCalib = document.getElementById("accelerometer-x-calib");
  tableAccXCalib.innerText = Number(calibAccX).toFixed(decimalPlaces);
  const tableAccYCalib = document.getElementById("accelerometer-y-calib");
  tableAccYCalib.innerText = Number(calibAccY).toFixed(decimalPlaces);
  const tableAccZCalib = document.getElementById("accelerometer-z-calib");
  tableAccZCalib.innerText = Number(calibAccZ).toFixed(decimalPlaces);

  const accelerometerLengthCalib = Math.sqrt(Math.pow(calibAccX, 2) + Math.pow(calibAccY, 2) + Math.pow(calibAccZ, 2));
  const tableAccLengthCalib = document.getElementById("accelerometer-length-calib");
  tableAccLengthCalib.innerText = Number(accelerometerLengthCalib).toFixed(decimalPlaces);

  const lengthThr = document.getElementById("length-thr");
  lengthThr.innerText = lengthThreshold;

  // add gyroscope and orientation data in the table
  const tableGyrX = document.getElementById("gyroscope-x");
  tableGyrX.innerText = Number(sensorData.gyroscope.x).toFixed(decimalPlaces);
  const tableGyrY = document.getElementById("gyroscope-y");
  tableGyrY.innerText = Number(sensorData.gyroscope.y).toFixed(decimalPlaces);
  const tableGyrZ = document.getElementById("gyroscope-z");
  tableGyrZ.innerText = Number(sensorData.gyroscope.z).toFixed(decimalPlaces);

  const tableOriX = document.getElementById("orientation-x");
  tableOriX.innerText = Number(sensorData.orientation.x).toFixed(decimalPlaces);
  const tableOriY = document.getElementById("orientation-y");
  tableOriY.innerText = Number(sensorData.orientation.y).toFixed(decimalPlaces);
  const tableOriZ = document.getElementById("orientation-z");
  tableOriZ.innerText = Number(sensorData.orientation.z).toFixed(decimalPlaces);
  const tableOriW = document.getElementById("orientation-w");
  tableOriW.innerText = Number(sensorData.orientation.w).toFixed(decimalPlaces);

  // add meters to table
  const meterAccX = document.getElementById("acc-x");
  meterAccX.value = tableAccX.innerText;
  const meterAccY = document.getElementById("acc-y");
  meterAccY.value = tableAccY.innerText;
  const meterAccZ = document.getElementById("acc-z");
  meterAccZ.value = tableAccZ.innerText;
  const meterAccLength = document.getElementById("acc-length");
  meterAccLength.value = tableAccLength.innerText;

  const meterAccXCalib = document.getElementById("cal-x");
  meterAccXCalib.value = calibAccX;
  const meterAccYCalib = document.getElementById("cal-y");
  meterAccYCalib.value = calibAccY;
  const meterAccZCalib = document.getElementById("cal-z");
  meterAccZCalib.value = calibAccZ;
  const meterAccLengthCalib = document.getElementById("cal-length");
  meterAccLengthCalib.value = calibAccZ;

  const meterGyrX = document.getElementById("gyr-x");
  meterGyrX.value = tableGyrX.innerText;
  const meterGyrY = document.getElementById("gyr-y");
  meterGyrY.value = tableGyrY.innerText;
  const meterGyrZ = document.getElementById("gyr-z");
  meterGyrZ.value = tableGyrZ.innerText;

  const meterOriX = document.getElementById("ori-x");
  meterOriX.value = tableOriX.innerText;
  const meterOriY = document.getElementById("ori-y");
  meterOriY.value = tableOriY.innerText;
  const meterOriZ = document.getElementById("ori-z");
  meterOriZ.value = tableOriZ.innerText;
  const meterOriW = document.getElementById("ori-w");
  meterOriW.value = tableOriW.innerText;

  // print x-, y-, z-values in console if length > threshold
  if ((accelerometerLengthCalib > lengthThreshold) && !valuesLogged) {
    console.log("x: " + calibAccX);
    console.log("y: " + calibAccY);
    console.log("z: " + calibAccZ);
    valuesLogged = true;
  }
  if (valuesLogged && (accelerometerLengthCalib < lengthThreshold)) {
    valuesLogged = false;
  }

  window.requestAnimationFrame(updateTableData);
}

function load () {
  if (localStorage.getItem('control-method')) {
    controlMethod = localStorage.getItem('control-method');
    displayIcon();
  }
  if (localStorage.getItem('leftSelect')) {
    leftGesture = localStorage.getItem('leftSelect');
  }
  if (localStorage.getItem('rightSelect')) {
    rightGesture = localStorage.getItem('rightSelect');
  }
  if (localStorage.getItem('rotateSelect')) {
    rotateGesture = localStorage.getItem('rotateSelect');
  }
  if (localStorage.getItem('downSelect')) {
    downGesture = localStorage.getItem('downSelect');
  }
  if (localStorage.getItem('length-threshold')) {
    lengthThreshold = localStorage.getItem('length-threshold');
  }
}

function displayIcon () {
  switch (controlMethod) {
    case "keyboard":
      KeyboardIcon.style.display = "block";
      GestureIcon.style.display = "none";
      ArmIcon.style.display = "none";
      gestureOptions.style.display = "none";
      break;
    case "gesture":
      KeyboardIcon.style.display = "none";
      GestureIcon.style.display = "block";
      ArmIcon.style.display = "none";
      gestureOptions.style.display = "block";
      break;
    case "arm":
      KeyboardIcon.style.display = "none";
      GestureIcon.style.display = "none";
      ArmIcon.style.display = "block";
      gestureOptions.style.display = "none";
      break;
  }
}

function updateUI () {
  document.getElementById('control-method').value = controlMethod;
  document.getElementById('leftSelect').value = leftGesture;
  document.getElementById('rightSelect').value = rightGesture;
  document.getElementById('rotateSelect').value = rotateGesture;
  document.getElementById('downSelect').value = downGesture;
  document.getElementById('length-threshold').value = lengthThreshold;
}

function save () {
  localStorage.setItem('control-method', controlMethod);
  localStorage.setItem('leftSelect', leftGesture);
  localStorage.setItem('rightSelect', rightGesture);
  localStorage.setItem('rotateSelect', rotateGesture);
  localStorage.setItem('downSelect', downGesture);
  localStorage.setItem('length-threshold', lengthThreshold);
}

function registerHandlers () {
  registerSelectControlHandler();
  registerSelectLeftHandler();
  registerSelectRightHandler();
  registerSelectRotateHandler();
  registerSelectDownHandler();
  registerInputThresholdHandler();
}

function registerSelectControlHandler () {
  const select = document.getElementById('control-method');
  select.addEventListener('change', (event) => {
    controlMethod = event.target.value;
    displayIcon();
    save();
  });
}

function registerSelectLeftHandler () {
  const select = document.getElementById('leftSelect');
  select.addEventListener('change', (event) => {
    leftGesture = event.target.value;
    save();
  });
}

function registerSelectRightHandler () {
  const select = document.getElementById('rightSelect');
  select.addEventListener('change', (event) => {
    rightGesture = event.target.value;
    save();
  });
}

function registerSelectRotateHandler () {
  const select = document.getElementById('rotateSelect');
  select.addEventListener('change', (event) => {
    rotateGesture = event.target.value;
    save();
  });
}

function registerSelectDownHandler () {
  const select = document.getElementById('downSelect');
  select.addEventListener('change', (event) => {
    downGesture = event.target.value;
    save();
  });
}

function registerInputThresholdHandler () {
  const threshold = document.getElementById('length-threshold');
  threshold.addEventListener('change', (event) => {
    lengthThreshold = event.target.value;
    save();
  });
}


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
