import Phaser from 'phaser';
import Thumbnail from '~/obje/Thumbnail';

export default class GameHUD extends Phaser.Scene {

   constructor() {
      super({ key: 'GameHUD' });
   }

   preload() {}

   create() {
      let thumb = new Thumbnail(this);
   }
   // update(t, dt) {}
}