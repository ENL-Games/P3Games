import Phaser from 'phaser';
import { Values } from '~/Utils';
import GameScene from './GameScene';

class GameHUD extends Phaser.Scene {
   
   _text_Time!: Phaser.GameObjects.Text;
   _text_Score!: Phaser.GameObjects.Text;
   _score: number = 0;   

   _curtain_OX!: Phaser.GameObjects.Rectangle;
   _img_OO!: Phaser.GameObjects.Image;
   _img_XX!: Phaser.GameObjects.Image;

   _tbutton_Retry!: Phaser.GameObjects.Text;
   _text_GameOverScore!: Phaser.GameObjects.Text;

   _limitTime: number = -1;
   _timeGauge!: Phaser.GameObjects.Rectangle;
   constructor() {
      super({ key: 'GameHUD' });
   }

   preload() {}

   create() {
      this.Make_UI();
   }

   Make_UI() {
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

         this.Set_Score(0);
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

      this._text_GameOverScore = this.add.text(canvasWidth / 2, 140, `0`);
      {
         this._text_GameOverScore.setOrigin(0.5, 0.5);
         this._text_GameOverScore.setStyle({
            font: "bold 120px Arial"
         });
         this._text_GameOverScore.setColor(`#ffff00`);

         this._text_GameOverScore.setVisible(false);
      }

      this._timeGauge = this.add.rectangle(538, 30, 204, 44
         , 0x00ff00);
      {
         this._timeGauge.setOrigin(0, 0);
         // this._timeGauge.setDisplaySize(204 * 0.5, 44);
      }
   }
   
   // _checkTime: boolean = false;
   // _counting: number = 0;  
   // _countingTime: number = 0;
   // _accTime: number = 0;
   // update(time, delta) {
   //    // let tt: number = time;
   //    // console.log(`GameHUD.update(time= ${tt}, delta= ${delta})`);

   //    if(!this._checkTime) {
   //       this._countingTime = this.time.now;
   //       this._accTime = 0;

   //       this._checkTime = true;
   //    }

   //    this._accTime += delta;
   //    if(1000 <= this._accTime) {
   //       this._counting += 1;
   //       console.log(`TICK !! (${this._counting})`);
   //       this._accTime = 0;
   //    }
   // }

   update(t, dt) {
      this.CheckTime(t);      
   }
   private CheckTime(__time: number) {
      if(-1 == this._limitTime) {
         return;
      }

      let remain = this._limitTime - __time;
      if(0 > remain) {
         this.Update_Gauge(0);
         return;
      }

      let ratio = remain / 1000;
         //= Phaser.Math.FloorTo(remain / 1000, -1);  

      // if(sec != this._sec) {
      //    this._sec = sec;
      //    console.log(this._sec);
      // }
      // console.log(sec);
      
      // console.log(`remain: ${this._limitTime} - ${t} = ${remain}`);
      this.Update_Gauge(ratio);
   }
   Reset_Time() {
      this._limitTime = (this.time.now + 1000) + 100;
   }
   private Update_Gauge(__ratio: number) {
      if(1 < __ratio) {
         __ratio = 1.0;
      }

      this._timeGauge.setDisplaySize(204 * __ratio, 44);
   }

   Show_OX(__OX: Values<typeof OX>, __show: boolean) {
      // console.log(`GameHUD.Show_OX(${__OX}, ${__show})`);
      this._curtain_OX.setVisible(__show);

      this._img_OO.setVisible(false);
      this._img_XX.setVisible(false);

      if(__show) {
         if(OX.O == __OX) {
            this._img_OO.setVisible(true);
            this.Set_Score(this._score + 1);
         }
         else if(OX.X == __OX) {
            this._img_XX.setVisible(true);
            this._tbutton_Retry.setVisible(true);

            this._text_GameOverScore.setText(this._score.toString());
            this._text_GameOverScore.setVisible(true);
         }
      }
   }

   OFF_Retry() {
      this.Show_OX(OX.X, false);
      this._tbutton_Retry.setVisible(false);

      this.Set_Score(0);
      this._text_GameOverScore.setVisible(false);
   }

   private Get_GameScene(): GameScene {
      return this.scene.get('GameScene') as GameScene;
   }

   private Set_Score(__score: number, __isUpdate: boolean = true) {
      this._score = __score;

      if(__isUpdate) {
         this.Update_Score();
      }
   }

   private Update_Score() {
      this._text_Score.setText(this._score.toString());
   }
}

const OX = { NONE: -1,
   X: 0,
   O: 1,
} as const;

export { GameHUD,
   OX,
}