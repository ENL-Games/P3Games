import Phaser from 'phaser';

import GameScene from './GameScene';

export /*default*/ class GameDialog extends Phaser.GameObjects.Container {
   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);
   }
}