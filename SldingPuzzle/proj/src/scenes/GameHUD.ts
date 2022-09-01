import Phaser from 'phaser';
import Thumbnail from '~/obje/Thumbnail';
import GameScene from './GameScene';

export default class GameHUD extends Phaser.Scene {

   _thumbnail: Thumbnail | undefined = undefined;
   _count: number = 0;
   _txt_Count!: Phaser.GameObjects.Text;

   _curtain!: Phaser.GameObjects.Rectangle;

   _txt_Clear!: Phaser.GameObjects.Text;
   _txtBtn_ClearRetry!: Phaser.GameObjects.Text;

   constructor() {
      super({ key: 'GameHUD' });
   }

   preload() {}
   create() {
      this.Make_UI();
   }

   private Make_UI() {
      this._thumbnail = new Thumbnail(this);

      let canvasWidth = this.sys.canvas.width;
      let canvasHeight = this.sys.canvas.height;

      this._txt_Count = this.add.text(canvasWidth - 20, 64, `0`);
      {
         this._txt_Count.setOrigin(1, 0.5);
         this._txt_Count.setStyle({
            font: "bold 100px Arial",
         });
         this._txt_Count.setColor(`#000000`);
         this._txt_Count.setStroke(`#ffffff`, 4);
      }

      let txtBtn_Reset = this.add.text(canvasWidth - 140, canvasHeight - 56, `RESET`);
      {
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

      let txtBtn_Exit = this.add.text(140, canvasHeight - 56, `EXIT`);
      {
         txtBtn_Exit.setOrigin(0.5, 0.5);
         txtBtn_Exit.setStyle({
            font: "bold 60px Arial",
         });
         txtBtn_Exit.setColor(`#00ff00`);
         txtBtn_Exit.setStroke(`#ffffff`, 2);

         {
            txtBtn_Exit.setInteractive().on('pointerdown', (pointer, localX, localY) => {
               this.Reset_Game();
            });//이벤트 처리

            txtBtn_Exit.setInteractive().on('pointerover', (pointer, localX, localY) => {
               txtBtn_Exit.setScale(1.25, 1.25);
            });//이벤트 처리
            txtBtn_Exit.setInteractive().on('pointerout', (pointer, localX, localY) => {
               txtBtn_Exit.setScale(1, 1);
            });//이벤트 처리
         }
      }

      this._curtain = this.add.rectangle(this.sys.canvas.width / 2, this.sys.canvas.height / 2
         , canvasWidth, canvasHeight
         , 0x000000);
      {
         this._curtain.setAlpha(0.01);

         this._curtain.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            // console.log("예외처리");
         });//이벤트 처리

         // this.Enable_Curtain(false);
      }

      this.Make_UI_Clear();
   }

   Make_UI_Clear() {
      this._txt_Clear = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2 - 60, `Clear`);
      {
         this._txt_Clear.setOrigin(0.5, 0.5);
         this._txt_Clear.setStyle({
            font: "bold 240px Arial",
         });
         this._txt_Clear.setColor(`#ffffff`);
      }

      this._txtBtn_ClearRetry = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height /2 + 200, `RESET`);
      {
         this._txtBtn_ClearRetry.setOrigin(0.5, 0.5);
         this._txtBtn_ClearRetry.setStyle({
            font: "bold 80px Arial",
         });
         this._txtBtn_ClearRetry.setColor(`#ff0000`);
         this._txtBtn_ClearRetry.setStroke(`#ffffff`, 2);

         {//이벤트 처리
            this._txtBtn_ClearRetry.setInteractive().on('pointerdown', (pointer, localX, localY) => {
               this.Reset_Game();
            });

            this._txtBtn_ClearRetry.setInteractive().on('pointerover', (pointer, localX, localY) => {
               this._txtBtn_ClearRetry.setScale(1.25, 1.25);
            });
            this._txtBtn_ClearRetry.setInteractive().on('pointerout', (pointer, localX, localY) => {
               this._txtBtn_ClearRetry.setScale(1, 1);
            });
         }
      }

      this.Show_Clear(false);
   }

   Reset_Game() {
      this.Get_Scene()
         .Reset_Game();
   }

   Show_Clear(__show: boolean) {
      this.Enable_Curtain(__show, true);

      this._txt_Clear.setVisible(__show);
      this._txtBtn_ClearRetry.setVisible(__show);
   }

   Enable_Curtain(__enable: boolean, __isClear: boolean = false) {
      this._curtain.setVisible(__enable);

      if(__enable) {
         let alpha = 0.01;
         if(__isClear) {
            alpha = 0.75;
         }
         this._curtain.setAlpha(alpha);
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

   Change_Thumbnail(__indexPuzzle: number) {
      this._thumbnail?.Change_Image(__indexPuzzle);
   }

   private Get_Scene(): GameScene {
      return this.scene.get(`GameScene`) as GameScene;
   }
}