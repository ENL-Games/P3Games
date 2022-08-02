import Phaser from 'phaser';
import GameScene from './GameScene';

export /*default*/ class GameCurtain extends Phaser.GameObjects.Container {
   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      let curtain = this.scene.add.rectangle(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height / 2
         , this.scene.sys.canvas.width, this.scene.sys.canvas.height
         , 0x000000);
      {
         curtain.setAlpha(0.75);

         curtain.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            // console.log("예외처리");
            let scene = this.scene as GameScene;
            scene.Tapped_Screen();
         });//이벤트 처리

         this.Add_ContainerItem(curtain);

         // curtain.setVisible(false);
      }
   }

   private Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }
}