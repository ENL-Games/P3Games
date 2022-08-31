import Phaser from "phaser";
import zNode from "../zNode";

export default class Thumbnail extends zNode {

   _baseImage!: Phaser.GameObjects.Image;

   constructor(__scene) {
      super(__scene);

      this._baseImage = __scene.add.image(0, 0, `yd-kkang`);
      this.Add_ContainerItem(this._baseImage);

      let boxOutline = this.scene.add.rectangle(0, 0, 600, 600);
      {
         this.Add_ContainerItem(boxOutline);
         // this._boxOutline.setStrokeStyle(3, 0xffff00);
         boxOutline.setStrokeStyle(5, 0xffff00);
      }

      this.setScale(0.25, 0.25);

       this.setPosition(90, 90);
   }
}