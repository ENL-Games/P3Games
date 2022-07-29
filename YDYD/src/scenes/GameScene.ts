import Phaser from 'phaser';

import { GameNarrative } from './GameNarrative';

export default class GameScene extends Phaser.Scene {

   _bgs!: Phaser.GameObjects.Image[];
   _indexBG: number = 0;

   constructor() {
      super({ key: 'GameScene' })
   }

   preload() {
   }

   create() {
      let canvasWidth = this.sys.canvas.width;
      let canvasHeight = this.sys.canvas.height;

      this._bgs = [];
      for(var n=0; n<4; n++) {
         let tKey = `bg-ingame-${n}`;
         this._bgs.push(this.add.image(canvasWidth / 2, canvasHeight / 2, tKey));

         this._bgs[n].setVisible(false);
      }

      this._indexBG = 0;
      this.Update_BG();

      let narrative = new GameNarrative(this);
   }

   Update_BG() {
      for(var n=0; n<this._bgs.length; n++) {

         let visible: boolean = (n == this._indexBG ? true : false);
         this._bgs[n].setVisible(visible);
      }
   }
}