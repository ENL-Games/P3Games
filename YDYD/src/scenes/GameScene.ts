import Phaser from 'phaser';

import { GameCurtain } from './GameCurtain';
import { GameDialog } from './GameDialog';
import { GameNarrative } from './GameNarrative';

export default class GameScene extends Phaser.Scene {

   _bg!: Phaser.GameObjects.Image;
   _bgKeys: string[] = [];
   _indexBG: number = 0;

   _curtain!: GameCurtain;
   _dialog!: GameDialog;
   _narrative!: GameNarrative;

   _state: number = STATE.NONE;

   constructor() {
      super({ key: 'GameScene' })
   }

   preload() {
   }

   create() {
      this._state = STATE.ready;

      let canvasWidth = this.sys.canvas.width;
      let canvasHeight = this.sys.canvas.height;

      for(var n=0; n<3; n++) {
         this._bgKeys.push(`bg-ingame-${n}`);
      }
      this._bg = this.add.image(canvasWidth / 2, canvasHeight / 2, this._bgKeys[0]);      

      this._curtain = new GameCurtain(this);
      this.Show_Curtain(false);

      this._dialog = new GameDialog(this);
      this._dialog.setVisible(false);

      this._narrative = new GameNarrative(this);

      this._state = STATE.narrative;

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

         this._bg.setTexture(this._bgKeys[0]);
         this.Show_Curtain(false);

         this._state = STATE.dialog;

         this._dialog.setVisible(true);
         this._dialog.Start_Dialaog();

         return;
      }

      this.Update_BG();
   }

   Tapped_Screen() {
      console.log(`GameScene.Tapped_Screen: _state= ${this._state}`);

      if(STATE.narrative == this._state) {
         if(this._narrative.IsCan_Touch()) {
            this.NextPage();
         }
      }
      else if(STATE.dialog == this._state) {
         this._dialog.Process_Dialog();
      }
   }

   Show_Curtain(__show: boolean) {
      this._curtain.setVisible(__show);
   }
}

const STATE = {
   NONE: -1,
   ready: 0,
   narrative: 1,
   dialog: 2,
   selector: 3,
} as const;