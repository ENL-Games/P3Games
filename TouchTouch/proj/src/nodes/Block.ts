import Phaser from "phaser";
import zNode from "../zNode";

import { BlockKind } from "../Defines";

export default class Block extends zNode {

   _baseImage!: Phaser.GameObjects.Image;

   _kind: number = -1;
   _index: number = 0;
   _isCracked: boolean = false;

   constructor(__scene, __kind: number, __index: number = 0) {
      super(__scene);
      __scene.add.existing(this);

      this._baseImage = __scene.add.image(0, 0, `block-boss`);
      this.Add_ContainerItem(this._baseImage);

      this._kind = __kind;
      this._index = __index;
      {
         let pos = this.Get_Position();
         this.setPosition(pos.x, pos.y);
      }
      this._isCracked = false;

      this.Choose_BaseImage();

      {//TEST
         this._baseImage.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            this.Crack();
         });//이벤트 처리
      }
   }

   private Get_Position(): Phaser.Math.Vector2 {
      let ret = new Phaser.Math.Vector2();
      {
         ret.x = PX_Blocks[this._kind];
         ret.y = PY_Block0 - (this._index * IntervalY_Block);
      }
      return ret;
   }

   Choose_BaseImage() {
      let texture: string = BaseImage_Texture[this._kind];
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

const PX_Blocks: number[] = [
   492, 640, 789
];
const PY_Block0: number = 556;
const IntervalY_Block = 84;