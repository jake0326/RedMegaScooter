/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Laser = function () {
  function Laser(size, x, y, xGain, yGain, img) {
    _classCallCheck(this, Laser);

    this.img = img;
    this.x = x + 23;
    this.y = y;
    this.xGain = xGain;
    this.yGain = yGain;
    this.size = size;
  }

  _createClass(Laser, [{
    key: "dissolve",
    value: function dissolve() {
      this.x = -1000;
      this.y = -1000;
    }
  }, {
    key: "renderLaser",
    value: function renderLaser(canvas, ctx) {
      this.x += this.xGain;
      this.y += this.yGain;

      ctx.drawImage(this.img, this.x, this.y, 5, this.size);
    }
  }]);

  return Laser;
}();

exports.default = Laser;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var shuffle = exports.shuffle = function shuffle(arr) {
  return arr.sort(function () {
    return Math.random() - 0.5;
  });
};

var collisionOccured = exports.collisionOccured = function collisionOccured(obj1, obj2, xOffset, yOffset, sizeOffset) {
  var dx = obj1.x - obj2.x + xOffset;
  var dy = obj1.y - obj2.y + yOffset;
  var distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < obj1.size + obj2.size - sizeOffset) {
    return true;
  }
  return false;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _starship = __webpack_require__(3);

var _starship2 = _interopRequireDefault(_starship);

var _enemy = __webpack_require__(4);

var _enemy2 = _interopRequireDefault(_enemy);

var _utility = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.font = "20px 'Press Start 2P'";

  var gameOverText = document.getElementById("game-over");
  var starship = new _starship2.default();
  var enemies = [];
  var killCount = 1;
  var score = 0;
  var waveTimers = [];
  var gameAnimation = void 0;
  var gameOver = true;

  var firstWaveFormation = [];
  var secondWaveFormation = [];
  for (var x = 50; x < 401; x += 50) {
    for (var y = 80; y < 331; y += 50) {
      var coords = { "x": x, "y": y };
      if (y < 181) {
        firstWaveFormation.push(coords);
      } else {
        secondWaveFormation.push(coords);
      }
    }
  }

  var starfieldColors = ["#31FFFF", "#008A00", "#931C1C", "#8B41C1", "#8C7D00"];
  for (var _i = 0; _i < 5; _i++) {
    starfieldColors = starfieldColors.concat(starfieldColors);
  }

  var starfieldPositions = [];
  for (var i = 0; i < 60; i++) {
    var radius = Math.random() * 2 + 1.5;
    starfieldPositions.push({
      "x": canvas.width * Math.random(),
      "y": canvas.height * Math.random(),
      "radius": radius
    });
  }

  var renderStarfield = function renderStarfield(canvas, ctx) {
    starfieldPositions.forEach(function (star, idx) {
      ctx.fillStyle = starfieldColors[idx];
      if (star.y > 600) {
        star.y = 0;
      }
      star.y++;
      ctx.fillRect(star.x, star.y, star.radius, star.radius);
    });
  };

  var createEnemyWave = function createEnemyWave(waveFormation, centerY, yCurveDirection) {
    (0, _utility.shuffle)(waveFormation).forEach(function (coords, idx) {
      waveTimers.push(setTimeout(function () {
        var enemy = void 0;
        if (idx % 2 == 0) {
          enemy = new _enemy2.default(coords.x, coords.y, 177, 341, centerY, 1, yCurveDirection);
        } else {
          enemy = new _enemy2.default(coords.x, coords.y, 154, 100, centerY, -1, yCurveDirection);
        }
        enemies.push(enemy);
      }, idx * 200));
    });
  };

  var queueEnemyWaves = function queueEnemyWaves() {
    createEnemyWave(firstWaveFormation, 200, 1);
    waveTimers.push(setTimeout(function () {
      return createEnemyWave(secondWaveFormation, 150, -1);
    }, 15000));
  };

  var gameLoop = function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillText(score, 400, 25);

    if (gameOver) {
      ctx.drawImage(gameOverText, 120, 150);
    }

    renderStarfield(canvas, ctx);

    if (killCount % 49 === 0) {
      killCount++;
      score += 100;
      queueEnemyWaves();
    }
    starship.renderStarship(canvas, ctx);
    enemies.forEach(function (enemy, idx) {
      enemy.renderEnemy(canvas, ctx);

      if (enemy.alive) {
        if ((0, _utility.collisionOccured)(enemy, starship, 12, -10, 65)) {
          starship.implode();
          setTimeout(function () {
            gameOver = true;
          }, 1500);
        }

        enemy.lasers.forEach(function (laser) {
          if ((0, _utility.collisionOccured)(starship, laser, 12, 17, 50)) {
            starship.implode();
            laser.dissolve();
            setTimeout(function () {
              gameOver = true;
            }, 1500);
          }
        });

        starship.lasers.forEach(function (laser) {
          if ((0, _utility.collisionOccured)(enemy, laser, 22, 17, 50)) {
            enemy.destroy(canvas, ctx);
            laser.dissolve();
            killCount += 1;
            score += 15;
          }
        });
      }
    });

    gameAnimation = requestAnimationFrame(gameLoop);
  };

  var resetGame = function resetGame() {
    waveTimers.forEach(function (wave) {
      return clearTimeout(wave);
    });
    enemies.forEach(function (enemy) {
      return enemy.alive = false;
    });
    starship.alive = false;
    waveTimers = [];
    enemies = [];
    starship = new _starship2.default();
    gameOver = false;
    killCount = 1;
    score = 0;
  };

  var startGame = function startGame() {
    resetGame();
    cancelAnimationFrame(gameAnimation);
    gameLoop();
    queueEnemyWaves();
  };

  var clickToPlay = function clickToPlay() {
    var startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", function () {
      startGame();
    });
  };

  var spaceToPlay = function spaceToPlay() {
    document.addEventListener("keydown", function (e) {
      if (e.keyCode === 32 && gameOver) {
        startGame();
      }
    });
  };

  clickToPlay();
  spaceToPlay();

  setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderStarfield(canvas, ctx);
    ctx.drawImage(document.getElementById("game-ready"), 190, 200);
  }, 1000 / 60);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _laser = __webpack_require__(0);

var _laser2 = _interopRequireDefault(_laser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Starship = function () {
  function Starship() {
    var _this = this;

    _classCallCheck(this, Starship);

    this.img = document.getElementById("gal-sprites");
    this.alive = true;
    this.x = 223;
    this.y = 540;
    this.xSource = 26;
    this.ySource = 58;
    this.size = 50;
    this.lasers = [];
    this.keysDown = {};

    document.addEventListener("keydown", function (e) {
      _this.keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", function (e) {
      delete _this.keysDown[e.keyCode];
    }, false);
  }

  _createClass(Starship, [{
    key: "moveStarship",
    value: function moveStarship() {
      if (this.keysDown[37] && this.x > 10 && this.alive) {
        this.x -= 3;
      } else if (this.keysDown[39] && this.x < 440 && this.alive) {
        this.x += 3;
      }
    }
  }, {
    key: "shootLaser",
    value: function shootLaser() {
      if (this.keysDown[32] && this.lasers.length < 1) {
        this.lasers.push(new _laser2.default(25, this.x, this.y, 0, -10, document.getElementById("laser")));
      }
    }
  }, {
    key: "renderLasers",
    value: function renderLasers(canvas, ctx) {
      var _this2 = this;

      this.lasers.forEach(function (laser, idx) {
        if (laser.y > 5) {
          laser.renderLaser(canvas, ctx);
        } else {
          var length = _this2.lasers.length;
          _this2.lasers = _this2.lasers.splice(0, idx).concat(_this2.lasers.splice(idx + 1, length));
        }
      });
    }
  }, {
    key: "implode",
    value: function implode() {
      var _this3 = this;

      this.alive = false;
      setTimeout(function () {
        _this3.xSource = 203;
        _this3.ySource = 65;
      }, 0);
      setTimeout(function () {
        _this3.x = -1000;
        _this3.y = -1000;
      }, 200);
    }
  }, {
    key: "renderStarship",
    value: function renderStarship(canvas, ctx) {
      this.moveStarship();
      this.shootLaser();
      this.renderLasers(canvas, ctx);
      ctx.drawImage(this.img, this.xSource, this.ySource, 25, 25, this.x, this.y, 50, 50);
    }
  }]);

  return Starship;
}();

exports.default = Starship;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _laser = __webpack_require__(0);

var _laser2 = _interopRequireDefault(_laser);

var _utility = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Enemy = function () {
  function Enemy(xFormation, yFormation, ySource, centerX, centerY, xCurveDirection, yCurveDirection) {
    _classCallCheck(this, Enemy);

    this.img = document.getElementById("gal-sprites");
    this.wingsOpen = true;
    this.size = 50;
    this.alive = true;
    this.attacking = false;
    this.horizontalGain = 1;
    this.lasers = [];
    this.x = null;
    this.y = null;
    this.xSource = 2;
    this.ySource = ySource;
    this.xSpeed = null;
    this.ySpeed = null;
    this.xF = xFormation;
    this.yF = yFormation;
    this.frameCount = 0;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = 150;
    this.angle = 0;
    this.xCurveDirection = xCurveDirection;
    this.yCurveDirection = yCurveDirection;

    this.prepareToAttack();
    this.toggleWings();
  }

  _createClass(Enemy, [{
    key: 'toggleWings',
    value: function toggleWings() {
      var _this = this;

      setTimeout(function () {
        _this.wingsOpen = _this.wingsOpen ? false : true;
        _this.toggleWings();
      }, 500);

      if (this.alive) {
        this.xSource = this.wingsOpen ? 26 : 2;
      }
    }
  }, {
    key: 'prepareToAttack',
    value: function prepareToAttack() {
      var _this2 = this;

      setTimeout(function () {
        _this2.attacking = true;
      }, Math.random() * 10000 + 5000);
    }
  }, {
    key: 'curveFromEntrance',
    value: function curveFromEntrance() {
      if (this.alive) {
        this.angle += .018;
        this.x = this.centerX + Math.cos(this.angle) * this.radius * this.xCurveDirection;
        this.y = this.centerY + Math.sin(this.angle) * this.radius * this.yCurveDirection;
        this.frameCount++;
      }
    }
  }, {
    key: 'reEnterFormation',
    value: function reEnterFormation() {
      if (this.alive) {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.frameCount++;
      }
    }
  }, {
    key: 'attack',
    value: function attack() {
      if (this.alive && this.attacking) {
        this.shootLaser();
        this.oscillate();

        if (this.y > 600) {
          this.y = -20;
        } else {
          this.y += 3;
        }

        this.frameCount++;
      }
    }
  }, {
    key: 'oscillate',
    value: function oscillate() {
      if (this.horizontalGain > 0) {
        if (this.horizontalGain > Math.random() * 60) {
          this.horizontalGain = 0;
        } else {
          this.horizontalGain += 0.1;
        }
      } else {
        if (this.horizontalGain < Math.random() * -60) {
          this.horizontalGain = 1;
        } else {
          this.horizontalGain -= 0.1;
        }
      }

      this.x += this.horizontalGain;
    }
  }, {
    key: 'shootLaser',
    value: function shootLaser() {
      if (Math.random() < 0.01) {
        this.lasers.push(new _laser2.default(30, this.x, this.y, Math.random() * (Math.round(Math.random()) * 2 - 1), 5, document.getElementById("enemy-bullet")));
      }
    }
  }, {
    key: 'renderLasers',
    value: function renderLasers(canvas, ctx) {
      var _this3 = this;

      this.lasers.forEach(function (laser, idx) {
        if (laser.y < 600) {
          laser.renderLaser(canvas, ctx);
        } else {
          var length = _this3.lasers.length;
          _this3.lasers = _this3.lasers.splice(0, idx).concat(_this3.lasers.splice(idx + 1, length));
        }
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var _this4 = this;

      this.alive = false;
      setTimeout(function () {
        _this4.xSource = 194;
        _this4.ySource = 225;
      }, 0);
      setTimeout(function () {
        _this4.xSource = 219;
        _this4.ySource = 225;
      }, 100);
      setTimeout(function () {
        _this4.xSource = 252;
        _this4.ySource = 225;
      }, 200);
      setTimeout(function () {
        _this4.x = -1000;
        _this4.y = -1000;
      }, 300);
    }
  }, {
    key: 'setSpeeds',
    value: function setSpeeds() {
      this.xSpeed = (this.xF - this.x) / 50;
      this.ySpeed = (this.yF - this.y) / 50;
    }
  }, {
    key: 'renderEnemy',
    value: function renderEnemy(canvas, ctx) {
      if (this.frameCount < 170) {
        this.curveFromEntrance();
        this.setSpeeds();
      } else if (this.frameCount < 220) {
        this.reEnterFormation();
      } else if (this.frameCount < 400) {
        this.attack();
        this.setSpeeds();
      } else {
        this.reEnterFormation();
        this.attacking = false;
        this.frameCount = 170;
        this.prepareToAttack();
      }

      this.renderLasers(canvas, ctx);

      ctx.drawImage(this.img, this.xSource, this.ySource, 25, 25, this.x, this.y, 50, 50);
    }
  }]);

  return Enemy;
}();

exports.default = Enemy;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map