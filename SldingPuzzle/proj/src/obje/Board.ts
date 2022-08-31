import Phaser from "phaser";
import zNode from "../zNode";
import BoardChip from "./BoardChip";

export default class Board extends zNode {

   constructor(__scene) {
      super(__scene);

      // {//BG
      // let bg = __scene.add.image(__scene.sys.canvas.width /2, __scene.sys.canvas.height / 2, `yd-kkang`);
      // this.Add_ContainerItem(bg);
      // bg.setAlpha(0.5);
      // }

    //   this.setSize(600, 600);

      this.Add_ChipSheet(__scene);

      this.Setup_Game(this.scene);
   }

   Setup_Game(__scene) {
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
         let chip = new BoardChip(__scene, n, orders[n], `puzzle-kkang`);
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