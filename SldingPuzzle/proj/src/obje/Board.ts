import Phaser from "phaser";
import { Async_Pause } from "~/Utils";
import zNode from "../zNode";
import BoardChip from "./BoardChip";

export default class Board extends zNode {

   _chips: BoardChip[] = [];

   // _chips_Last: BoardChip | undefined;

   constructor(__scene) {
      super(__scene);

      // {//BG
      // let bg = __scene.add.image(__scene.sys.canvas.width /2, __scene.sys.canvas.height / 2, `yd-kkang`);
      // this.Add_ContainerItem(bg);
      // bg.setAlpha(0.5);
      // }
      this.Add_ChipSheet(__scene);

      let bg = __scene.add.rectangle(__scene.sys.canvas.width /2, __scene.sys.canvas.height / 2, 600, 600, 0xf1200c);
      // this.setSize(600, 600);
      this.Add_ContainerItem(bg);

      let boxOutline = this.scene.add.rectangle(__scene.sys.canvas.width /2, __scene.sys.canvas.height / 2, 610, 610);
      {
         this.Add_ContainerItem(boxOutline);
         boxOutline.setStrokeStyle(10, 0xf1200c);
         // boxOutline.setAlpha(0.5);
      }

      this.Setup_Game(this.scene);
   }

   Setup_Game(__scene) {
      for(let n=0; n<this._chips.length; n++) {
         this._chips[n].destroy();
      }
      this._chips = [];

      for(let n=0; n<16; n++) {
         let chip = new BoardChip(__scene, n, n, `puzzle-kkang`);
         this._chips.push(chip);
      }

      this.Shuffle_Chips();
   }

   private async Shuffle_Chips() {
      await Async_Pause(1000);

      let orders: number[] = [];
      {//shuffle
         for (let n = 0; n < 16; n++) {
            orders.push(n);
         }
         // console.log(orders);
         orders.sort(() => Math.random() - 0.5);
         // console.log(orders);
      }

      for(let n=0; n<16; n++) {
         this._chips[n].Update_Position(orders[n]);
         this._chips[n].Show_Number(true);
         this._chips[n].Show_Outline(true);
         // this._chips[n].Enable_Collider(true);
      }
      {//last chip delete
         // console.log(this._chips);
         // this._chips[15].destroy();
         // this._chips_Last = this._chips.pop();
         // this._chips_Last?.setVisible(false);
         this._chips[15].setVisible(false);
         // console.log(`last chip is: ${this._chips_Last?.Index}`);
         // console.log(this._chips);
      }
   }

   Add_ChipSheet(__scene) {

      let puzzle = 'puzzle-kkang';
      for (let n = 0; n < 16; n++) {
         __scene.anims.create({
            key: `${puzzle}-${n}`,
            frames: __scene.anims.generateFrameNumbers(puzzle, { frames: [n] }),
         });
      }
   }
}