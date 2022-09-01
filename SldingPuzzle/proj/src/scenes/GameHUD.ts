import Phaser from 'phaser';
import Thumbnail from '~/obje/Thumbnail';
import zNode from '~/zNode';
import GameScene from './GameScene';

export default class GameHUD extends zNode {

   _count: number = 0;
   _txt_Count!: Phaser.GameObjects.Text;

   constructor(__scene) {
      super(__scene);

      let thumb = new Thumbnail(__scene);

      this._txt_Count = __scene.add.text(__scene.sys.canvas.width - 20, 64, `0`);
      {
         this.Add_ContainerItem(this._txt_Count);

         this._txt_Count.setOrigin(1, 0.5);
         this._txt_Count.setStyle({
            font: "bold 100px Arial",
         });
         this._txt_Count.setColor(`#000000`);
         this._txt_Count.setStroke(`#ffffff`, 4);
      }

      let txtBtn_Reset = __scene.add.text(__scene.sys.canvas.width - 140, __scene.sys.canvas.height - 56, `RESET`);
      {
         this.Add_ContainerItem(txtBtn_Reset);

         txtBtn_Reset.setOrigin(0.5, 0.5);
         txtBtn_Reset.setStyle({
            font: "bold 60px Arial",
         });
         txtBtn_Reset.setColor(`#ff0000`);
         txtBtn_Reset.setStroke(`#ffffff`, 2);

         {
            txtBtn_Reset.setInteractive().on('pointerdown', (pointer, localX, localY) => {
               this.Get_Scene()
                  .Reset_Game();
            });//이벤트 처리

            txtBtn_Reset.setInteractive().on('pointerover', (pointer, localX, localY) => {
               txtBtn_Reset.setScale(1.25, 1.25);
            });//이벤트 처리
            txtBtn_Reset.setInteractive().on('pointerout', (pointer, localX, localY) => {
               txtBtn_Reset.setScale(1, 1);
            });//이벤트 처리
         }
      }

      let txtBtn_Exit = __scene.add.text(140, __scene.sys.canvas.height - 56, `EXIT`);
      {
         this.Add_ContainerItem(txtBtn_Exit);

         txtBtn_Exit.setOrigin(0.5, 0.5);
         txtBtn_Exit.setStyle({
            font: "bold 60px Arial",
         });
         txtBtn_Exit.setColor(`#00ff00`);
         txtBtn_Exit.setStroke(`#ffffff`, 2);

         {
            txtBtn_Exit.setInteractive().on('pointerdown', (pointer, localX, localY) => {
               this.Get_Scene()
                  .Exit_Game();
            });//이벤트 처리

            txtBtn_Exit.setInteractive().on('pointerover', (pointer, localX, localY) => {
               txtBtn_Exit.setScale(1.25, 1.25);
            });//이벤트 처리
            txtBtn_Exit.setInteractive().on('pointerout', (pointer, localX, localY) => {
               txtBtn_Exit.setScale(1, 1);
            });//이벤트 처리
         }
      }
   }

   Reset_Count() {
      this._count = 0;

      this.Update_Count();
   }
   Add_Count() {
      this._count += 1;

      this.Update_Count();
   }
   Update_Count() {
      this._txt_Count.setText(this._count.toString());
   }

   private Get_Scene(): GameScene {
      return this.scene as GameScene;
   }
}