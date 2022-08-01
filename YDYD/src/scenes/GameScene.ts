import Phaser from 'phaser';

import { GameDialog } from './GameDialog';
import { GameNarrative } from './GameNarrative';

export default class GameScene extends Phaser.Scene {

   _bg!: Phaser.GameObjects.Image;
   _bgKeys: string[] = [];
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

      for(var n=0; n<3; n++) {
         this._bgKeys.push(`bg-ingame-${n}`);
      }
      this._bg = this.add.image(canvasWidth / 2, canvasHeight / 2, this._bgKeys[0]);

      this._dialog = new GameDialog(this);
      this._dialog.setVisible(false);
      this._narrative = new GameNarrative(this);

      this._indexBG = 0;
      this.Update_BG();
   }

   Update_BG() {
      this._bg.setTexture(this._bgKeys[this._indexBG]);

      this._narrative.Set_Page(this._indexBG);
   }

   NextPage() {
      // console.log(`Foo`);

      this._indexBG += 1;
      // console.log(`NextPage: _bgs.length= ${this._bgs.length}, _indexBG= ${this._indexBG}`);

      if(this._bgKeys.length <= this._indexBG) {
         // console.log(`NextPage: complete(${this._indexBG})`);

         this._narrative.setVisible(false);

         this._dialog.setVisible(true);
         this._dialog.Start_Dialaog();

         return;
      }

      this.Update_BG();
   }
}