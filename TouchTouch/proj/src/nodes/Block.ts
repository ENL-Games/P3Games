import Phaser from "phaser";
import zNode from "../zNode";

export default class Block extends zNode {

   _baseImage!: Phaser.GameObjects.Image;

   _index: number = 0;
   _isCracked: boolean = false;

   constructor(__scene, __index: number) {
      super(__scene);
      __scene.add.existing(this);

      this._baseImage = __scene.add.image(0, 0, `block-boss`);
      this.Add_ContainerItem(this._baseImage);

      this._index = __index;
      this._isCracked = false;

      this.Choose_BaseImage();

      {//TEST
         this._baseImage.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            this.Crack();
         });//이벤트 처리
      }
   }

   Choose_BaseImage() {
      let texture: string = BaseImage_Texture[this._index];
      if(this._isCracked) {
         texture += `-cracked`;
      }
      // console.log(texture);
      this._baseImage.setTexture(texture);
   }

   Crack() {
      this._isCracked = !this._isCracked;
      this.Choose_BaseImage();

      // if(this._isCracked) {//TEST
      //    this._baseImage.setInteractive().off('pointerdown');
      // }
   }
}

const BaseImage_Texture = [
   `block-boss`, `block-gob`, `block-cat`
];