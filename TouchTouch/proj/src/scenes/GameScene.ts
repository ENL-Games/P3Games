import Phaser from "phaser";
import Block from "~/nodes/Block";
import { Async_Pause } from "~/Utils";

export default class GameScene extends Phaser.Scene {
   _text_Time!: Phaser.GameObjects.Text;
   _text_Score!: Phaser.GameObjects.Text;

   constructor() {
      super({ key: 'GameScene' })
   }

   preload() {}

   create() {
      let canvasWidth = this.sys.canvas.width;
      let canvasHeight = this.sys.canvas.height;

      this.add.image(canvasWidth / 2, canvasHeight / 2, `bg-game`);

      this.create_UI();

      this.Regen_Blocks();
   }

   async Regen_Blocks() {
      let block!: Block;

      let countList = [5, 5, 5];
      for(let kind=0; kind<3; kind++) {
         let count = countList[kind];
         for(let c=0; c<count; c++) {
            block = new Block(this, kind, c);

            let lastIndex = count - 1;
            if(lastIndex == c) {
               let delayNextKind = (lastIndex - 1) * Block.DelayInterval_Showing;
               await Async_Pause(delayNextKind);
            }
         }
      }
   }

   create_UI() {
      let canvasWidth = this.sys.canvas.width;

      this._text_Time = this.add.text(canvasWidth / 2, 52, `0`);
      {
         this._text_Time.setOrigin(0.5, 0.5);
         this._text_Time.setStyle({
            font: "bold 40px Arial",
         });
         this._text_Time.setColor(`#00ff00`);
      }

      this._text_Score = this.add.text(canvasWidth / 2, 118, `SCORE: ${0}`);
      {
         this._text_Score.setOrigin(0.5, 0.5);
         this._text_Score.setStyle({
            font: "bold 32px Arial",
         });
      }
   }
}