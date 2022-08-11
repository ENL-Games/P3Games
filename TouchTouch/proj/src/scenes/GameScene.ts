import Phaser from "phaser";
import Block from "~/nodes/Block";
import Switch from "~/nodes/Switch";
import { Async_Pause } from "~/Utils";

export default class GameScene extends Phaser.Scene {
   _text_Time!: Phaser.GameObjects.Text;
   _text_Score!: Phaser.GameObjects.Text;

   _blocks: Block[][] = [];
   _blocksCount: number[] = [0, 0, 0];
   _blocksCurrent: number[] = [0, 0, 0];

   constructor() {
      super({ key: 'GameScene' })
   }

   preload() {}

   create() {
      let canvasWidth = this.sys.canvas.width;
      let canvasHeight = this.sys.canvas.height;

      this.add.image(canvasWidth / 2, canvasHeight / 2, `bg-game`);
      
      this.Make_Switch();
      this.create_UI();

      this.Regen_Blocks();
   }

   private Make_Switch() {
      let sw!: Switch;

      for(let kind=0; kind<3; kind++) {
         sw = new Switch(this, kind);
      }
   }

   async Regen_Blocks() {
      this._blocks = [];
      this._blocksCount = [0, 0, 0];
      this._blocksCurrent = [0, 0, 0];

      for(let kind=0; kind<3; kind++) {
         let rnd = Phaser.Math.Between(1, 5);
         this._blocksCount[kind] = rnd;
      }

      let block!: Block;

      for(let kind=0; kind<3; kind++) {
         let count = this._blocksCount[kind];

         let items: Block[] = [];
         for(let c=0; c<count; c++) {
            block = new Block(this, kind, c);
            items[c] = block;

            let lastIndex = count - 1;
            if(lastIndex == c) {
               let delayNextKind = (lastIndex) * Block.DelayInterval_Showing;
               await Async_Pause(delayNextKind);
            }
         }

         this._blocks[kind] = items;
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

   Crack_Block(__kind: number) {
      // console.log(`GameScene.Crack_Block(${__kind}): _blocksCount= ${this._blocksCount[__kind]}, _blocksCurrent= ${this._blocksCurrent[__kind]}`);

      let current = this._blocksCurrent[__kind];
      let kindList = this._blocks[__kind];

      if(kindList.length <= current) {
         console.log(`GameScene.Crack_Block(${__kind}): No No ~~!!`);
         return;
      }

      kindList[current].Crack();
      this._blocksCurrent[__kind]++;
   }
}