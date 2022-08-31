import Phaser from "phaser";
import zNode from "../zNode";

export default class BoardChip extends zNode {

   _index: number = -1;

   constructor(__scene, __index: number, __order: number) {
      super(__scene);
      __scene.add.existing(this);
      this.setSize(ChipSize, ChipSize);

      let bg = __scene.add.image(0, 0, `yd-kkang`);
      this.Add_ContainerItem(bg);
      {
         let cropPos = this.Get_CropPos(__order);
         console.log(cropPos);
         // bg.setCrop(cropPos.x, cropPos.y, ChipSize, ChipSize);
         
         bg.setCrop(0, 0, ChipSize, ChipSize);
      }

      let v2 = this.Get_Position(__order);
      this.setPosition(v2.x, v2.y);
      {
         // bg.setPosition(500, 500);
      }
   }

   private Get_Position(__order: number): Phaser.Math.Vector2 {
      let v = new Phaser.Math.Vector2(300 + 340, 300 + 60);
      let pos = this.Get_Pos(__order);
      v.x += (ChipSize * pos.x);
      v.y += (ChipSize * pos.y);
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