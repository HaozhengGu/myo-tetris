var qte= require('quaternion-to-euler');

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
    $(block).append(
      "<div class='inner-tile'><div class='inner-inner-tile'></div></div>"
    );
    this.element = block;
  }

  init() {
    $("#board").append(this.element);
  }

  render() {
    $(this.element).css({
      left: this.y * $(this.element).innerWidth() + "px",
      top: this.x * $(this.element).innerHeight() + "px"
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
      duration: 500
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
    return this.blocks
      .map(b => b.getPosition())
      .map(p => new Position(p.x + 1, p.y));
  }

  fall() {
    for (let block of this.blocks) {
      block.fall();
    }
  }

  rightPositions() {
    return this.blocks.map(b => b.rightPosition());
  }

  leftPositions() {
    return this.blocks.map(b => b.leftPosition());
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
    let blocks = this.rotatePositions().map(p => new Block(p.x, p.y));
    this.clear();
    this.addBlocks(blocks);
    this.position = this.getNextPosition();
  }

  rotatePositions() {
    let pos = this.getBlocks()
      .shift()
      .getPosition();
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
    let blocks = this.rotatePositions().map(p => new Block(p.x, p.y));
    this.clear();
    this.addBlocks(blocks);
    this.position = this.getNextPosition();
  }

  rotatePositions() {
    let pos = this.getBlocks()
      .shift()
      .getPosition();
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
    let blocks = this.rotatePositions().map(p => new Block(p.x, p.y));
    this.clear();
    this.addBlocks(blocks);
    this.position = this.getNextPosition();
  }

  rotatePositions() {
    let pos = this.getBlocks()
      .shift()
      .getPosition();
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
    let blocks = this.rotatePositions().map(p => new Block(p.x, p.y));
    this.clear();
    this.addBlocks(blocks);
    this.position = this.getNextPosition();
  }

  rotatePositions() {
    let pos = this.getBlocks()
      .shift()
      .getPosition();
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
    console.log("DEBUG", "Board", "construct() - new")
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
    Myo.connect('');

    Myo.on('connected', function(){
      let connectStatus = document.getElementById('connect-status');
      connectStatus.innerText = 'connected';
      console.log('connected!', this.id)
      Myo.setLockingPolicy('none');
      // Myo.setLockingPolicy('standard');
    });

    Myo.onError = function () {  
      let connectStatus = document.getElementById('connect-status');
      connectStatus.innerText = 'disconnected';
      console.log("Woah, couldn't connect to Myo Connect");
    }

    $(".empty").each(function(index, ele) {
      let x = parseInt(index / 10);
      let y = index % 10;
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
    this.interval = setInterval(function() {
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
      if (
        this.arePositonsWithinBoard(shape.fallingPositions()) &&
        this.areBlocksEmpty(shape.fallingPositions())
      ) {
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
        this.flashBlocks(blocks, function() {
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
      if (
        this.arePositonsWithinBoard(shape.leftPositions()) &&
        this.areBlocksEmpty(shape.leftPositions())
      ) {
        shape.moveLeft();
        shape.render();
      }
    }
  }

  rotate() {
    for (let shape of this.shapes) {
      if (
        this.arePositonsWithinBoard(shape.rotatePositions()) &&
        this.areBlocksEmpty(shape.rotatePositions())
      )
        shape.rotate();
      shape.init();
      shape.render();
    }
  }

  rightKeyPress() {
    for (let shape of this.shapes) {
      if (
        this.arePositonsWithinBoard(shape.rightPositions()) &&
        this.areBlocksEmpty(shape.rightPositions())
      ) {
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

let board = new Board();

$(document).keydown(function(e) {
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
  e.preventDefault(); // prevent the default action (scroll / move caret)
});

// Myo.on('fist', function(){  
//   console.log('Rotate!');
//   // this.vibrate();
//   board.upKeyPress();
// });

// // Myo.on('double_tap', function(){  
// //   console.log('Rotate!');
// //   // this.vibrate();
// //   board.upKeyPress();
// // });

// Myo.on('wave_in', function(){  
//   console.log('Move left!');
//   // this.vibrate();
//   board.leftKeyPress();
// });

// Myo.on('wave_out', function(){  
//   console.log('Move right!');
//   // this.vibrate();
//   board.rightKeyPress();
// });

// Myo.on('fingers_spread', function(){  
//   console.log('Speed up!');
//   // this.vibrate();
//   board.downKeyPress();
// });



let arrayOriX = [];
let arrayOriY = [];

let arrayAccX = [];
let arrayAccY = [];

const buttonToggle = document.getElementById("toggle");
const buttonSettings = document.getElementById("settings");
buttonToggle.addEventListener("click", onClickToggle);
buttonSettings.addEventListener("click", onClickSettings);

function onClickToggle() {
  const table = document.getElementById("sensors");
  if (table.style.display === "none") {
    table.style.display = "block";
  } else {
    table.style.display = 'none';
  }
}

function onClickSettings() {
  const settings = document.getElementById("choose-control-method");
  if (settings.style.display === "none") {
    settings.style.display = "block";
  } else {
    settings.style.display = 'none';
  }
}

Myo.on('imu', function(data){

  // console.log("imu",data.accelerometer);

  let oriX = data.orientation['x'];
  let oriY = data.orientation['y'];

  let accX = data.accelerometer['x'];
  let accY = data.accelerometer['y'];


  // let ori = document.getElementById('ori');
  // ori.innerText = JSON.stringify(data.orientation, null, 4);
  // let quat = [data.orientation.x, data.orientation.y, data.orientation.z, data.orientation.w];
  // let euler = qte(quat);
  // ori.innerText += "\nEuler (rad): \n" + JSON.stringify(euler, null, 4);
  // ori.innerText += "\nEuler (°): \n" + JSON.stringify(euler.map(n => n * 180/Math.PI), null, 4);
  // let gyr = document.getElementById('gyr');
  // gyr.innerText = JSON.stringify(data.gyroscope, null, 4);
  // let acc = document.getElementById('acc');
  // acc.innerText = JSON.stringify(data.accelerometer, null, 4);


  let oriXValue = document.getElementById('ori-x-value');
  oriXValue.innerText = JSON.stringify(data.orientation.x.toFixed(2), null, 4);
  let oriYValue = document.getElementById('ori-y-value');
  oriYValue.innerText = JSON.stringify(data.orientation.y.toFixed(2), null, 4);
  let oriZValue = document.getElementById('ori-z-value');
  oriZValue.innerText = JSON.stringify(data.orientation.z.toFixed(2), null, 4);
  let oriWValue = document.getElementById('ori-w-value');
  oriWValue.innerText = JSON.stringify(data.orientation.w.toFixed(2), null, 4);

  let gyrXValue = document.getElementById('gyr-x-value');
  gyrXValue.innerText = JSON.stringify(data.gyroscope.x.toFixed(2), null, 4);
  let gyrYValue = document.getElementById('gyr-y-value');
  gyrYValue.innerText = JSON.stringify(data.gyroscope.y.toFixed(2), null, 4);
  let gyrZValue = document.getElementById('gyr-z-value');
  gyrZValue.innerText = JSON.stringify(data.gyroscope.z.toFixed(2), null, 4);

  
  let accXValue = document.getElementById('acc-x-value');
  accXValue.innerText = JSON.stringify(data.accelerometer.x.toFixed(2), null, 4);
  let accYValue = document.getElementById('acc-y-value');
  accYValue.innerText = JSON.stringify(data.accelerometer.y.toFixed(2), null, 4);
  let accZValue = document.getElementById('acc-z-value');
  accZValue.innerText = JSON.stringify(data.accelerometer.z.toFixed(2), null, 4);

  let l = Math.pow(data.accelerometer.x) + Math.pow(data.accelerometer.y) + Math.pow(data.accelerometer.z);
  let accLValue = document.getElementById('acc-l-value');
  accLValue.innerText = JSON.stringify(Math.sqrt(l).toFixed(2), null, 4);

  d3.csv(function(err, rows) {
    function unpack(rows, key) {
      return rows.map(function(row) {
        return row[key];
      });
    }
    var x = unpack(rows , data.accelerometer.x);
    var y = unpack(rows , data.accelerometer.y);
    var z = unpack(rows , data.accelerometer.z);
    Plotly.newPlot('myDiv', [{
    type: 'scatter3d',
    mode: 'lines',
    x: x,
    y: y,
    z: z,
    }]);
  });

  arrayOriX.push(oriX);
  arrayOriY.push(oriY);

  arrayAccX.push(accX);
  arrayAccY.push(accY);

  if(arrayOriX.length > 50) {
    arrayOriX.shift();
  }
  if(arrayOriY.length > 50) {
    arrayOriY.shift();
  }

  if(arrayAccX.length > 50) {
    arrayAccX.shift();
  }
  if(arrayAccY.length > 50) {
    arrayAccY.shift();
  }
  
  // if(accX > 0.9) {
  //   console.log('Rotate!');
  //   // this.vibrate();
  //   board.upKeyPress();
  // }

  // if(accX < -0.9) {
  //   console.log('Speed up!');
  //   // this.vibrate();
  //   board.downKeyPress();
  // }

  // if(oriY > 0.2) {
  //   console.log('Move left!');
  //   // this.vibrate();
  //   board.leftKeyPress();
  // }

  // if(oriY< -0.5) {
  //   console.log('Move right!');
  //   // this.vibrate();
  //   board.rightKeyPress();
  // }

});

setInterval(function() {

  // let counterAccUp = 0;
  // let counterAccDown = 0;
  // let counterAccLeft = 0;
  // let counterAccRight = 0;

  // let counterOriUp = 0;
  // let counterOriDown = 0;
  // let counterOriLeft = 0;
  // let counterOriRight = 0;

  // // console.log('bewergen test');

  // arrayAccX.forEach(function(item) {
  //   // Acc x > 0.9: up
  //   if(item > 0.5) {
  //     counterAccUp += 1;
  //   }
  //   // Acc x < -0.9: down
  //   if(item < -0.4) {
  //     counterAccDown += 1;
  //   }
  // });

  // arrayAccY.forEach(function(item) {
  //   // Acc y < 0: left
  //   if(item < 0.6) {
  //     counterAccLeft += 1;
  //   }
  //   // Acc y > 0.9: right
  //   if(item > 0.8) {
  //     counterAccRight += 1;
  //   }
  // });

  // arrayOriX.forEach(function(item) {
  //   // Ori x < 0: left
  //   if(item < 0.3) {
  //     counterOriLeft += 1;
  //   }
  //   // Ori x > 0.6: right
  //   if(item > 0.4) {
  //     counterOriRight += 1;
  //   }
  // });

  // arrayOriY.forEach(function(item) {
  //   // Ori y < -0.5: up
  //   if(item < -0.4) {
  //     counterOriUp += 1;
  //   }
  //   // Ori y > 0.5: down
  //   if(item > -0.1) {
  //     counterOriDown += 1;
  //   }
  // });

  // if(counterAccUp > 45 && counterOriUp > 45) {
  //   console.log('Rotate!');
  //   // this.vibrate();
  //   board.upKeyPress();
  //   counterAccUp = 0;
  //   counterOriUp = 0;
  // }

  // if(counterAccDown > 30 && counterOriDown > 30) {
  //   console.log('Speed up!');
  //   // this.vibrate();
  //   board.downKeyPress();
  //   counterAccDown = 0;
  //   counterOriDown = 0;
  // }

  // if(counterAccLeft > 30 && counterOriLeft > 30) {
  //   console.log('Move left!');
  //   // this.vibrate();
  //   board.leftKeyPress();
  //   counterAccLeft = 0;
  //   counterOriLeft = 0;
  // }

  // if(counterAccRight > 30 && counterOriRight > 30) {
  //   console.log('Move right!');
  //   // this.vibrate();
  //   board.rightKeyPress();
  //   counterAccRight = 0;
  //   counterOriRight = 0;
  // }

}, 500);



$("#new-game").click(function() {
  board.newGame();
});

$("#down").click(function() {
  board.downKeyPress();
});

$("#rotate").click(function() {
  board.upKeyPress();
});

$("#left").click(function() {
  board.leftKeyPress();
});

$("#right").click(function() {
  board.rightKeyPress();
});