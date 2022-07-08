import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {

   private _canvasWidth: number = 0;
   private _canvasHeight: number = 0;

   constructor() {
      super({ key: 'GameScene' })
   }

   preload() {
      this.load.image('bg', 'assets/bg.png');
   }

   create() {
      this._canvasWidth = this.sys.canvas.width;
      this._canvasHeight = this.sys.canvas.height;

      this.add.image(this._canvasWidth / 2, this._canvasHeight / 2, 'bg');
   }
}
