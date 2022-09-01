import Phaser from "phaser";
import { ResManager } from "~/ResManager";
import zNode from "../zNode";

export default class Thumbnail extends zNode {

   _baseImage!: Phaser.GameObjects.Image;

   constructor(__scene) {
      super(__scene);

      this._baseImage = __scene.add.image(0, 0, ResManager.Get_Puzzle_ThumbKey(0));
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

   Change_Image(__indexPuzzle: number) {
      this._baseImage.setTexture(ResManager.Get_Puzzle_ThumbKey(__indexPuzzle));
   }   
}