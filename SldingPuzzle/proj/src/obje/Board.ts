import Phaser from "phaser";
import zNode from "../zNode";
import BoardChip from "./BoardChip";

export default class Board extends zNode {

   constructor(__scene) {
      super(__scene);

      let bg = __scene.add.image(__scene.sys.canvas.width /2, __scene.sys.canvas.height / 2, `yd-kkang`);
      this.Add_ContainerItem(bg);
      bg.setAlpha(0.5);

    //   this.setSize(600, 600);

      this.Add_ChipSheet(__scene);

      for(let n=0; n<16; n++) {
         let chip = new BoardChip(__scene, n, n);
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