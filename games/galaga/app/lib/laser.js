class Laser {
  constructor(size, x, y, xGain, yGain, img) {
    this.img = img;
    this.x = x + 23;
    this.y = y;
    this.xGain = xGain;
    this.yGain = yGain;
    this.size = size;
  }

  dissolve() {
    this.x = -1000;
    this.y = -1000;
  }

  renderLaser(canvas, ctx) {
    this.x += this.xGain;
    this.y += this.yGain;

    ctx.drawImage(
      this.img,
      this.x,
      this.y,
      5,
      this.size
    );
  }
}

export default Laser;
