import Phaser from "phaser";
import zNode from "../zNode";

export default class Board extends zNode {

   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      let bg = __scene.add.image(__scene.sys.canvas.width /2, __scene.sys.canvas.height / 2, `yd-kkang`);
      this.Add_ContainerItem(bg);
   }
}