import Phaser from "phaser";
import zNode from "../zNode";

export default class Block extends zNode {

   _baseImage!: Phaser.GameObjects.Image;

   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      this._baseImage = __scene.add.image(0, 0, `block-boss`);
      this.Add_ContainerItem(this._baseImage);
   }
}