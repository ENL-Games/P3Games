import Phaser from 'phaser';

import { GameDialog } from './GameDialog';
import { GameNarrative } from './GameNarrative';

export default class GameScene extends Phaser.Scene {

   _bgs!: Phaser.GameObjects.Image[];
   _indexBG: number = 0;

   _dialog!: GameDialog;
   _narrative!: GameNarrative;

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

      this._dialog = new GameDialog(this);
      this._narrative = new GameNarrative(this);

      this._indexBG = 0;
      this.Update_BG();
   }

   Update_BG() {
      for(var n=0; n<this._bgs.length; n++) {

         let visible: boolean = (n == this._indexBG ? true : false);
         this._bgs[n].setVisible(visible);
      }

      this._narrative.Set_Page(this._indexBG);
   }

   NextPage() {
      // console.log(`Foo`);

      this._indexBG += 1;

      if(this._bgs.length <= this._indexBG) {
         console.log(`NextPage: complete(${this._indexBG})`);
         return;
      }

      this.Update_BG();
   }
}