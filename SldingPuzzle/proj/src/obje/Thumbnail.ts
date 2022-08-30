import Phaser from "phaser";
import zNode from "../zNode";

export default class Thumbnail extends zNode {

   _baseImage!: Phaser.GameObjects.Image;

   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      this._baseImage = __scene.add.image(0, 0, `yd`);
      this.Add_ContainerItem(this._baseImage);

      this.setScale(0.25, 0.25);

       this.setPosition(90, 90);
   }
}