import Phaser from 'phaser';

import GameScene from './GameScene';

export /*default*/ class GameDialog extends Phaser.GameObjects.Container {

   _charL!: Phaser.GameObjects.Image;
   _charR!: Phaser.GameObjects.Image;

   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      let PY_Char = 450;
      this._charL = this.scene.add.image(240, PY_Char, `game-dialog-capgirl`);
      this.Add_ContainerItem(this._charL);

      this._charR = this.scene.add.image(1040, PY_Char, `game-dialog-sister`);
      this.Add_ContainerItem(this._charR);
   }

   private Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }
}