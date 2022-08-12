import Phaser from 'phaser';
import { Values } from '~/Utils';
import GameScene from './GameScene';

class GameHUD extends Phaser.Scene {
   
   _text_Time!: Phaser.GameObjects.Text;
   _text_Score!: Phaser.GameObjects.Text;

   _curtain_OX!: Phaser.GameObjects.Rectangle;
   _img_OO!: Phaser.GameObjects.Image;
   _img_XX!: Phaser.GameObjects.Image;

   _tbutton_Retry!: Phaser.GameObjects.Text;

   constructor() {
      super({ key: 'GameHUD' });
   }

   preload() {}

   create() {
      let canvasWidth = this.sys.canvas.width;
      let canvasHeight = this.sys.canvas.height;

      this._text_Time = this.add.text(canvasWidth / 2, 52, `0`);
      {
         this._text_Time.setOrigin(0.5, 0.5);
         this._text_Time.setStyle({
            font: "bold 40px Arial",
         });
         this._text_Time.setColor(`#00ff00`);
      }

      this._text_Score = this.add.text(canvasWidth / 2, 118, `SCORE: ${0}`);
      {
         this._text_Score.setOrigin(0.5, 0.5);
         this._text_Score.setStyle({
            font: "bold 32px Arial",
         });
      }

      this._curtain_OX = this.add.rectangle(canvasWidth / 2, canvasHeight / 2, canvasWidth, canvasHeight
         , 0x000000);
      {
         this._curtain_OX.setAlpha(0.3);

         this._curtain_OX.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            // console.log("예외처리");
         });//이벤트 처리

         this._curtain_OX.setVisible(false);
      }

      this._img_OO = this.add.image(canvasWidth / 2, canvasHeight / 2, `ui-oo`);
      this._img_XX = this.add.image(canvasWidth / 2, canvasHeight / 2, `ui-xx`);
      {
         this._img_OO.setVisible(false);
         this._img_XX.setVisible(false);
      }

      this._tbutton_Retry = this.add.text(canvasWidth / 2, canvasHeight - 100, `RETRY`);
      {
         this._tbutton_Retry.setOrigin(0.5, 0.5);
         this._tbutton_Retry.setStyle({
            font: "bold 64px Arial"
         });
         this._tbutton_Retry.setColor(`#ff00ff`);

         {//event
            this._tbutton_Retry.setInteractive().on('pointerover', (pointer, localX, localY) => {
               this._tbutton_Retry.setScale(1.15, 1.15);
            });//이벤트 처리
            this._tbutton_Retry.setInteractive().on('pointerout', (pointer, localX, localY) => {
               this._tbutton_Retry.setScale(1, 1);
            });//이벤트 처리
      
            this._tbutton_Retry.setInteractive().on('pointerdown', (pointer, localX, localY) => {
               // console.log("Retry");
               this.Get_GameScene()
                  .Retry_Game();
            });//이벤트 처리
         }

         this._tbutton_Retry.setVisible(false);
      }
   }

   Show_OX(__OX: Values<typeof OX>, __show: boolean) {
      console.log(`GameHUD.Show_OX(${__OX}, ${__show})`);
      this._curtain_OX.setVisible(__show);

      this._img_OO.setVisible(false);
      this._img_XX.setVisible(false);

      if(__show) {
         if(OX.O == __OX) {
            this._img_OO.setVisible(true);
         }
         else if(OX.X == __OX) {
            this._img_XX.setVisible(true);
            this._tbutton_Retry.setVisible(true);
         }
      }
   }

   OFF_Retry() {
      this.Show_OX(OX.X, false);
      this._tbutton_Retry.setVisible(false);
   }

   private Get_GameScene(): GameScene {
      return this.scene.get('GameScene') as GameScene;
   }
}

const OX = { NONE: -1,
   X: 0,
   O: 1,
} as const;

export { GameHUD,
   OX,
}