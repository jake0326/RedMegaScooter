import Laser from './laser';

class Starship {
  constructor() {
    this.img = document.getElementById("gal-sprites");
    this.alive = true;
    this.x = 223;
    this.y = 540;
    this.xSource = 26;
    this.ySource = 58;
    this.size = 50;
    this.lasers = [];
    this.keysDown = {};

    document.addEventListener("keydown", (e) => {
      this.keysDown[e.keyCode] = true;
    }, false);

    document.addEventListener("keyup", (e) => {
      delete this.keysDown[e.keyCode];
    }, false);
  }

  moveStarship() {
    if (this.keysDown[37] && this.x > 10 && this.alive) {
      this.x -= 3;
    } else if (this.keysDown[39] && this.x < 440 && this.alive) {
      this.x += 3;
    }
  }

  shootLaser() {
    if (this.keysDown[32] && this.lasers.length < 1) {
      this.lasers.push(new Laser(25, this.x, this.y, 0, -10, document.getElementById("laser")));
    }
  }

  renderLasers(canvas, ctx) {
    this.lasers.forEach( (laser, idx) => {
      if (laser.y > 5) {
        laser.renderLaser(canvas, ctx);
      } else {
        let length = this.lasers.length;
        this.lasers = this.lasers.splice(0, idx).concat(
          this.lasers.splice(idx + 1, length)
        );
      }
    });
  }

  implode() {
    this.alive = false;
    setTimeout(() => {
      this.xSource = 203;
      this.ySource = 65;
    }, 0);
    setTimeout(() => {
      this.x = -1000;
      this.y = -1000;
    }, 200);
  }

  renderStarship(canvas, ctx) {
    this.moveStarship();
    this.shootLaser();
    this.renderLasers(canvas, ctx);
    ctx.drawImage(
      this.img,
      this.xSource,
      this.ySource,
      25,
      25,
      this.x,
      this.y,
      50,
      50,
    );
  }
}

export default Starship;
