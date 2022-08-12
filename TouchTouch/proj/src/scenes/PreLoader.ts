import Phaser from "phaser";

export default class PreLoader extends Phaser.Scene {
   constructor() {
      super(LoadConfig);
   }

   preload() {
      // this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

      this.load.image('bg-intro', 'assets/bg-intro.png');
      this.load.image('bg-game', 'assets/bg-game.png');

      this.load.image('block-boss', 'assets/block-boss.png');
      this.load.image('block-boss-cracked', 'assets/block-boss-cracked.png');
      this.load.image('block-gob', 'assets/block-gob.png');
      this.load.image('block-gob-cracked', 'assets/block-gob-cracked.png');
      this.load.image('block-cat', 'assets/block-cat.png');
      this.load.image('block-cat-cracked', 'assets/block-cat-cracked.png');

      this.load.image('switch-boss', 'assets/switch-boss.png');
      this.load.image('switch-boss-push', 'assets/switch-boss-push.png');
      this.load.image('switch-gob', 'assets/switch-gob.png');
      this.load.image('switch-gob-push', 'assets/switch-gob-push.png');
      this.load.image('switch-cat', 'assets/switch-cat.png');
      this.load.image('switch-cat-push', 'assets/switch-cat-push.png');
   }

   create() {
      this.scene.start('IntroScene');
   }
}

const LoadConfig = {
   key: "PreLoader",
   // pack: {
   //     files: [{
   //         type: 'plugin',
   //         key: 'rexwebfontloaderplugin',
   //         url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js',
   //         start: true
   //     }]
   // }
};