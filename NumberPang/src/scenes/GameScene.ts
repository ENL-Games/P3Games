import Phaser from 'phaser';

import Number from '../obj/Number';

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

      let number = new Number(this);
      number.Setup(2, new Phaser.Math.Vector2(100, 100));

      number = new Number(this);
      number.Setup(8, new Phaser.Math.Vector2(300, 200));
   }

   HitTheNumber(__number: number) {
      console.log("HitTheNumber(" + __number + ")");
   }
}
