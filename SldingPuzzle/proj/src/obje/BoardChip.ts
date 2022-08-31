import Phaser from "phaser";
import zNode from "../zNode";

export default class BoardChip extends zNode {

   _index: number = -1;

   constructor(__scene, __index: number, __order: number, __stage: string) {
      super(__scene);
      this.setSize(ChipSize, ChipSize);

      this._index = __index;
      
      let bg: Phaser.GameObjects.Sprite = __scene.add.sprite(0, 0, ``);
      bg.play(`${__stage}-${__index}`);
      this.Add_ContainerItem(bg);

      let v2 = this.Get_Position(__order);
      this.setPosition(v2.x, v2.y);
      {
         // bg.setPosition(500, 500);
      }

      {//TEST
         this.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            console.log(`${__index}`);
         });//이벤트 처리
      }
   }

   private Get_Position(__order: number): Phaser.Math.Vector2 {
      let v = new Phaser.Math.Vector2(415, 135);
         //= new Phaser.Math.Vector2(300 + 340, 300 + 60);
      let pos = this.Get_Pos(__order);
      v.x += (ChipSize * pos.x);
      v.y += (ChipSize * pos.y);
      // {//TEST
      //    v.x += (pos.x * 10);
      //    v.y += (pos.y * 10);
      // }
      return v;
   }

   private Get_Pos(__order: number): Phaser.Math.Vector2 {
      let v = new Phaser.Math.Vector2(0, 0);
      v.x = __order % 4;
      v.y = Phaser.Math.FloorTo(__order / 4);
      return v;
   }

   private Get_CropPos(__order: number): Phaser.Math.Vector2 {
      let v = new Phaser.Math.Vector2(0, 0);
      let pos = this.Get_Pos(__order);
      v.x = pos.x * ChipSize;
      v.y = pos.y * ChipSize;
      return v;
   }
}

const ChipSize: number = 150;