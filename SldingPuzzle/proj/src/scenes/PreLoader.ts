import Phaser from "phaser";
import { ResManager } from "~/ResManager";

export default class PreLoader extends Phaser.Scene {
   constructor() {
      super(LoadConfig);
   }

   preload() {
      this.load.image('bg-intro', 'assets/bg-intro.png');

      this.load.image('bg-game', 'assets/bg-game.png');

      for(let n=0; n<ResManager.Get_Puzzle_Count(); n++) {//puzzle res
         let keySpriteSheet = ResManager.Get_Puzzle_SpriteSheet(n);
         let assetFilename = `assets/${keySpriteSheet}.png`;

         this.load.image(ResManager.Get_Puzzle_ThumbKey(n), assetFilename);
         this.load.spritesheet(keySpriteSheet, assetFilename
            , { frameWidth: 150, frameHeight: 150 }
            );
      }
   }

   create() {
      this.scene.start(
         'IntroScene'
         // 'GameScene'
         );
   }
}

const LoadConfig = {
   key: "PreLoader",
};