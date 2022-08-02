import Phaser from "phaser";
import { GameSelectBox } from "./GameSelectBox";

export class GameSelector extends Phaser.GameObjects.Container {
   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      let box = new GameSelectBox(__scene, this, 0);
      this.Add_ContainerItem(box);
      box.setPosition(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height / 2 - 60);
      box.Set_Text("1. 참자!!");

      box = new GameSelectBox(__scene, this, 1);
      this.Add_ContainerItem(box);
      box.setPosition(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height / 2 + 60);
      box.Set_Text("2. 공격!!");
   }

   OnClick_SelectBox(__index: number) {
      console.log(`OnClick_SelectBox(index= ${__index})`);
   }

   private Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }
}