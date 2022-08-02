import Phaser from "phaser";

export class GameSelector extends Phaser.GameObjects.Container {
   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      let box = this.scene.add.rectangle(0, 0, 100, 100, 0xffff00);
      {
         this.Add_ContainerItem(box);
      }
   }

   private Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }
}