import Phaser from 'phaser';

export default class zNode extends Phaser.GameObjects.Container {

   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);
   }

   protected Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }

   destroy(fromScene?: boolean | undefined): void {
      // console.log(`destroy() <= ${this._num}`);

      super.destroy(fromScene);
   }
}