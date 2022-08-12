import Phaser from "phaser";
import Block from "~/nodes/Block";
import Switch from "~/nodes/Switch";
import { Async_Pause } from "~/Utils";
import { GameHUD, OX } from "./GameHUD";

export default class GameScene extends Phaser.Scene {
   _blocks: Block[][] = [];
   _blocksCount: number[] = [0, 0, 0];
   _blocksCurrent: number[] = [0, 0, 0];
   _blocksClear: boolean[] = [false, false, false];

   constructor() {
      super({ key: 'GameScene' })
   }

   preload() {}

   create() {
      this.scene.run('GameHUD');
      
      let canvasWidth = this.sys.canvas.width;
      let canvasHeight = this.sys.canvas.height;

      this.add.image(canvasWidth / 2, canvasHeight / 2, `bg-game`);
      
      this.Make_Switch();
      this.Regen_Blocks();
   }

   private Make_Switch() {
      let sw!: Switch;

      for(let kind=0; kind<3; kind++) {
         sw = new Switch(this, kind);
      }
   }

   Retry_Game() {
      this.Reset_Blocks();

      this.Regen_Blocks();

      this.Get_GameHUD()
         .OFF_Retry();
   }

   async Regen_Blocks() {
      this._blocks = [];
      this._blocksCount = [0, 0, 0];
      this._blocksCurrent = [0, 0, 0];
      this._blocksClear = [false, false, false];

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

      let HUD = this.Get_GameHUD();
      {
         HUD.Reset_Time();
         HUD.Show_OX(OX.O, false);
      }
   }

   Crack_Block(__kind: number) {
      // console.log(`GameScene.Crack_Block(${__kind}): _blocksCount= ${this._blocksCount[__kind]}, _blocksCurrent= ${this._blocksCurrent[__kind]}`);

      let current = this._blocksCurrent[__kind];
      let kindList = this._blocks[__kind];

      if(kindList.length <= current) {
         // console.log(`GameScene.Crack_Block(${__kind}): Game Over ~~!!`);
         this.Get_GameHUD()
            .Show_OX(OX.X, true);
         return;
      }

      kindList[current].Crack();
      this._blocksCurrent[__kind]++;

      if(kindList.length <= this._blocksCurrent[__kind]) {
         this._blocksClear[__kind] = true;

         // console.log(`GameScene.Crack_Block(${__kind}): clear`);

         let allCleared: boolean = true;
         for(let kind=0; kind<3; kind++) {
            if(!this._blocksClear[kind]) {
               allCleared = false;
               break;
            }
         }

         if(allCleared) {
            // console.log(`GameScene.Crack_Block(${__kind}): All Cleared`);
            this.ClearedAll();
         }
      }
   }

   private async ClearedAll() {

      this.Get_GameHUD()
         .Show_OX(OX.O, true);

      await Async_Pause(500);

      this.Reset_Blocks();

      this.Regen_Blocks();
   }

   private Reset_Blocks() {
      for(let kind=0; kind<3; kind++) {
         let count = this._blocksCount[kind];
         for(let c=0; c<count; c++) {
            this._blocks[kind][c].destroy();
         }
      }
   }

   private Get_GameHUD(): GameHUD {
      return this.scene.get('GameHUD') as GameHUD;
   }
}