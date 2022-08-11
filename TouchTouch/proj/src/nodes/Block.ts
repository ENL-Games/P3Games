import Phaser from "phaser";
import zNode from "../zNode";

import { BlockKind } from "../Defines";

export default class Block extends zNode {

   _baseImage!: Phaser.GameObjects.Image;

   _kind: number = -1;
   _index: number = 0;
   _isCracked: boolean = false;

   /*
   * const
   */
   static Duration_Showing: number  = 200;
   static DelayInterval_Showing: number = 170;

   constructor(__scene, __kind: number, __index: number = 0) {
      super(__scene);
      __scene.add.existing(this);

      this._baseImage = __scene.add.image(0, 0, `block-boss`);
      this.Add_ContainerItem(this._baseImage);
      this._baseImage.setVisible(false);

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

      this.Show_Block();
   }

   private Show_Block() {
      const MoveY: number = 30;

      let pos = this.Get_Position();
      let delay = this._index * Block.DelayInterval_Showing;

      this.scene.tweens.add({
         targets: this._baseImage,
         alpha: { value: 1, duration: Block.Duration_Showing, delay: delay },
         onStart: () => {
            this._baseImage.setAlpha(0);
            this._baseImage.setVisible(true);
         },
      });
      this.scene.tweens.add({
         targets: this._baseImage,
         props: {
            y: { value: MoveY, duration: Block.Duration_Showing, delay: delay }
         },
         ease: Phaser.Math.Easing.Bounce.Out,

         onStart: () => {
            this.setPosition(pos.x, pos.y - MoveY);
         },
      });
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