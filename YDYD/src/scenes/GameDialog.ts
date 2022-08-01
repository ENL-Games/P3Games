import Phaser from 'phaser';

import GameScene from './GameScene';

export /*default*/ class GameDialog extends Phaser.GameObjects.Container {

   _char!: Phaser.GameObjects.Image;

   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      let PY_Char = 450;
      this._char = this.scene.add.image(this.scene.sys.canvas.width / 2, PY_Char, `game-dialog-capgirl`);
      this.Add_ContainerItem(this._char);

      this.Setup_DialogBox();
   }

   Setup_DialogBox() {
      let PY_DialogBox = 620;
      let Width_DialogBox = 1180;
      let Height_DialogBox = 160;

      let box = this.scene.add.rectangle(this.scene.sys.canvas.width / 2, PY_DialogBox
         , Width_DialogBox, Height_DialogBox
         , 0x000000);
      {
         box.setAlpha(0.75);

         let boxOutline = this.scene.add.rectangle(this.scene.sys.canvas.width / 2, PY_DialogBox
            , Width_DialogBox, Height_DialogBox
            );
         boxOutline.setStrokeStyle(5, 0xff00ff);

         let nameTag!: Phaser.GameObjects.Shape;
         let nameTagOutline!: Phaser.GameObjects.Shape;
         {//name
            let PY = 520 + 12;
            let WIDTH = 200;
            let HEIGHT = 32;

            nameTag = this.scene.add.rectangle(50, PY, WIDTH, HEIGHT, 0x000000);
            // nameTag.setAlpha(0.75);
            nameTag.setOrigin(0, 0.5);

            nameTagOutline = this.scene.add.rectangle(50, PY, WIDTH, HEIGHT);
            nameTagOutline.setOrigin(0, 0.5);
            nameTagOutline.setStrokeStyle(5, 0xff00ff);
         }

         this.Add_ContainerItem(box);
         this.Add_ContainerItem(boxOutline);

         this.Add_ContainerItem(nameTag);
         this.Add_ContainerItem(nameTagOutline);
      }
   }

   private Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }
}