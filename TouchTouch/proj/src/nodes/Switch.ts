import Phaser from "phaser";
import zNode from "../zNode";

import { BlockKind } from "../Defines";
import GameScene from "~/scenes/GameScene";

export default class Switch extends zNode {

   _baseImage!: Phaser.GameObjects.Image;

   _kind: number = -1;

   constructor(__scene, __kind: number) {
      super(__scene);
      __scene.add.existing(this);

      this._kind = __kind;

      this._baseImage = __scene.add.image(0, 0, `switch-boss`);
      this.Add_ContainerItem(this._baseImage);

      let pos = new Phaser.Math.Vector2();
      {
         const PX: number[] = [
            492, 640, 788
         ];

         pos.x = PX[this._kind];
         pos.y = 641;
         // {//DEV TEST
         //    pos.x -= 66;
         //    pos.y -= 46;
         // }

         this.setPosition(pos.x, pos.y);
      }

      this._baseImage.setInteractive().on('pointerdown', (pointer, localX, localY) => {
         // console.log(`Switch.pointerdown(): ${this._kind}`);
         this.Get_Scene().Crack_Block(this._kind);
         this.Choose_BaseImage(true);
      });//이벤트 처리
      this._baseImage.setInteractive().on('pointerup', (pointer, localX, localY) => {
         // console.log(`Switch.pointerdown(): ${this._kind}`);
         this.Choose_BaseImage(false);
      });//이벤트 처리

      this.Choose_BaseImage();
   }

   Choose_BaseImage(__push: boolean = false) {
      let texture: string = BaseImage_Texture[this._kind];
      // console.log(texture);
      if(__push) {
         texture += "-push";
      }
      this._baseImage.setTexture(texture);
   }

   private Get_Scene(): GameScene {
      var core = this.scene.scene.get('GameScene') as GameScene;
      return core;
   }
}

const BaseImage_Texture = [
   `switch-boss`, `switch-gob`, `switch-cat`
];