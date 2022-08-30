import Phaser from "phaser";

export default class PreLoader extends Phaser.Scene {
   constructor() {
      super(LoadConfig);
   }

   preload() {
   }

   create() {
      this.scene.start('IntroScene');
   }
}

const LoadConfig = {
   key: "PreLoader",
};