import Phaser from "phaser";

const ResKey_Images_BGs = [
   "bg-dend",
   "bg-sindo",
   "bg-taw",
];

export {
   ResKey_Images_BGs,
}

export default class PreLoader extends Phaser.Scene {
   constructor() {
      super("PreLoader");
   }

   preload() {
      this.load.image(ResKey_Images_BGs[0], 'assets/bg-dend.png');
      this.load.image(ResKey_Images_BGs[1], 'assets/bg-sindo.png');
      this.load.image(ResKey_Images_BGs[2], 'assets/bg-taw.png');
   }

   create() {
      this.scene.start('GameScene');
   }
}