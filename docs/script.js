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
let board = new Board();
window.requestAnimationFrame(updateTableData);
// localStorage.removeItem("local-storage");
let controlMethod = "keyboard";
registerSelectHandler();

const accelerometerCalibratedButton = document.getElementById("accelerometer-calibrate");
accelerometerCalibratedButton.addEventListener("click", calibrateAccelerometer);

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

Myo.on('wave_in', function(){  
  if (controlMethod === "gesture") {
    const left = document.querySelector('#leftSelect');
    const right = document.querySelector('#rightSelect');
    const rotate = document.querySelector('#rotateSelect');
    const down = document.querySelector('#downSelect');
    const leftIndex = left.selectedIndex;
    const rightIndex = right.selectedIndex;
    const rotateIndex = rotate.selectedIndex;
    const downIndex = down.selectedIndex;
    if (left[leftIndex].value === "wave-in") {
      board.leftKeyPress();
      console.log('Move left!');
    } else if (right[rightIndex].value === "wave-in") {
      board.rightKeyPress();
      console.log('Move right!');
    } else if (rotate[rotateIndex].value === "wave-in") {
      board.upKeyPress();
      console.log('Rotate!');
    } else if (down[downIndex].value === "wave-in") {
      board.downKeyPress();
      console.log('Down!');
    }
  }
});

Myo.on('wave_out', function(){  
  if (controlMethod === "gesture") {
    const left = document.querySelector('#leftSelect');
    const right = document.querySelector('#rightSelect');
    const rotate = document.querySelector('#rotateSelect');
    const down = document.querySelector('#downSelect');
    const leftIndex = left.selectedIndex;
    const rightIndex = right.selectedIndex;
    const rotateIndex = rotate.selectedIndex;
    const downIndex = down.selectedIndex;
    if (left[leftIndex].value === "wave-out") {
      board.leftKeyPress();
      console.log('Move left!');
    } else if (right[rightIndex].value === "wave-out") {
      board.rightKeyPress();
      console.log('Move right!');
    } else if (rotate[rotateIndex].value === "wave-out") {
      board.upKeyPress();
      console.log('Rotate!');
    } else if (down[downIndex].value === "wave-out") {
      board.downKeyPress();
      console.log('Down!');
    }
  }
});

Myo.on('fist', function(){  
  if (controlMethod === "gesture") {
    const left = document.querySelector('#leftSelect');
    const right = document.querySelector('#rightSelect');
    const rotate = document.querySelector('#rotateSelect');
    const down = document.querySelector('#downSelect');
    const leftIndex = left.selectedIndex;
    const rightIndex = right.selectedIndex;
    const rotateIndex = rotate.selectedIndex;
    const downIndex = down.selectedIndex;
    if (left[leftIndex].value === "fist") {
      board.leftKeyPress();
      console.log('Move left!');
    } else if (right[rightIndex].value === "fist") {
      board.rightKeyPress();
      console.log('Move right!');
    } else if (rotate[rotateIndex].value === "fist") {
      board.upKeyPress();
      console.log('Rotate!');
    } else if (down[downIndex].value === "fist") {
      board.downKeyPress();
      console.log('Down!');
    }
  }
});

Myo.on('fingers_spread', function(){  
  if (controlMethod === "gesture") {
    const left = document.querySelector('#leftSelect');
    const right = document.querySelector('#rightSelect');
    const rotate = document.querySelector('#rotateSelect');
    const down = document.querySelector('#downSelect');
    const leftIndex = left.selectedIndex;
    const rightIndex = right.selectedIndex;
    const rotateIndex = rotate.selectedIndex;
    const downIndex = down.selectedIndex;
    if (left[leftIndex].value === "fingers-spread") {
      board.leftKeyPress();
      console.log('Move left!');
    } else if (right[rightIndex].value === "fingers-spread") {
      board.rightKeyPress();
      console.log('Move right!');
    } else if (rotate[rotateIndex].value === "fingers-spread") {
      board.upKeyPress();
      console.log('Rotate!');
    } else if (down[downIndex].value === "fingers-spread") {
      board.downKeyPress();
      console.log('Down!');
    }
  }
});

Myo.on('double_tap',function(){
  if (controlMethod === "gesture") {
    const left = document.querySelector('#leftSelect');
    const right = document.querySelector('#rightSelect');
    const rotate = document.querySelector('#rotateSelect');
    const down = document.querySelector('#downSelect');
    const leftIndex = left.selectedIndex;
    const rightIndex = right.selectedIndex;
    const rotateIndex = rotate.selectedIndex;
    const downIndex = down.selectedIndex;
    if (left[leftIndex].value === "double-tap") {
      board.leftKeyPress();
      console.log('Move left!');
    } else if (right[rightIndex].value === "double-tap") {
      board.rightKeyPress();
      console.log('Move right!');
    } else if (rotate[rotateIndex].value === "double-tap") {
      board.upKeyPress();
      console.log('Rotate!');
    } else if (down[downIndex].value === "double-tap") {
      board.downKeyPress();
      console.log('Down!');
    }
  }
});


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

  
  const meterAccXCalib = document.getElementById("cal-x");
  meterAccXCalib.value = calibAccX;
  const meterAccYCalib = document.getElementById("cal-y");
  meterAccYCalib.value = calibAccY;
  const meterAccZCalib = document.getElementById("cal-z");
  meterAccZCalib.value = calibAccZ;

  if (Number(accelerometerLengthCalib).toFixed(decimalPlaces) > 1) {
    console.log("x: " + Number(calibAccX).toFixed(decimalPlaces));
    console.log("y: " + Number(calibAccY).toFixed(decimalPlaces));
    console.log("z: " + Number(calibAccZ).toFixed(decimalPlaces));
  }

  window.requestAnimationFrame(updateTableData);
}



// setInterval(function () {}, 500);
function registerSelectHandler () {
  const select = document.getElementById('control-method');

  select.addEventListener('change', (event) => {
    controlMethod = event.target.value;
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
