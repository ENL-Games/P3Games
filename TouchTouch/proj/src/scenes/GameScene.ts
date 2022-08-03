import Phaser from "phaser";
import Block from "~/nodes/Block";

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
      
      let block!: Block;
      for(let x=0; x<3; x++) {
         for(let y=0; y<5; y++) {
            block = new Block(this, x);
            block.setPosition(PX_Blocks[x], PY_Block1 - (y * IntervalY_Block));
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

const PX_Blocks: number[] = [
   492, 640, 789
];
const PY_Block1: number = 556;
const IntervalY_Block = 84;