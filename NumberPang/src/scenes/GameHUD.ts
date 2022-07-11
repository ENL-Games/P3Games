import Phaser from 'phaser';
import GameScene from './GameScene';

enum HUD_Curatin_State { NONE = 0,
	weak, default
}

export {
   HUD_Curatin_State,
}

export default class GameHUD extends Phaser.Scene {

   private _timer!: Phaser.Time.TimerEvent;
   private _text_Timer!: Phaser.GameObjects.Text;
   private _sec: number = 0;

   private _text_Score!: Phaser.GameObjects.Text;
   private _socre: number = 0;

   private _curtain!: Phaser.GameObjects.Rectangle;

   private _text_GameOver!: Phaser.GameObjects.Text;
   private _text_FinalScore!: Phaser.GameObjects.Text;
   private _text_Retry!: Phaser.GameObjects.Text;

   constructor() {
      super({ key: 'GameHUD' });
   }

   preload() {
   }

   create() {
      this._text_Timer = this.add.text(this.sys.canvas.width / 2, 58, "0");
      {
         this._text_Timer.setOrigin(0.5, 0.5);
         this._text_Timer.setStyle({
            font: "bold 64px Arial"
         });
      }

      this._text_Score = this.add.text(this.sys.canvas.width - 20, 60, "0");
      {
         this._text_Score.setColor(`#ffff00`)
         this._text_Score.setOrigin(1, 0.5);
         this._text_Score.setStyle({
            font: "bold 100px Arial"
         });
      }

      this._curtain = this.add.rectangle(this.sys.canvas.width / 2, this.sys.canvas.height / 2
         , this.sys.canvas.width, this.sys.canvas.height
         , 0x000000);
      {
         this._curtain.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            // console.log("예외처리");
         });//이벤트 처리
      }

      this._text_GameOver = this.add.text(this.sys.canvas.width / 2, 280, "Game Over");
      {
         this._text_GameOver.setColor(`#ff0000`);
         this._text_GameOver.setOrigin(0.5, 0.5);
         this._text_GameOver.setStyle({
            font: "bold 160px Arial"
         });

         this._text_GameOver.setVisible(false);
      }
      this._text_FinalScore = this.add.text(this.sys.canvas.width / 2, this.sys.canvas.height / 2, "0");
      {
         this._text_FinalScore.setColor(`#ffff00`);
         this._text_FinalScore.setOrigin(0.5, 0.5);
         this._text_FinalScore.setStyle({
            font: "bold 120px Arial"
         });

         this._text_FinalScore.setVisible(false);
      }

      this._text_Retry = this.add.text(this.sys.canvas.width / 2, 720, "Retry");
      {
         this._text_Retry.setOrigin(0.5, 0.5);
         this._text_Retry.setStyle({
            font: "bold 100px Arial"
         });

         this._text_Retry.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            this.Ready_Game(true);
         });//이벤트 처리

         this._text_Retry.setVisible(false);
      }

      this.Ready_Game(false);
   }

   private Ready_Game(__isRetry: boolean) {

      this.Set_Score(0);

      if(__isRetry) {
         var core = this.scene.get('GameScene') as GameScene;
         core.Retry_Game();
      }

      this._sec = FullTimeSeconds;
      this.Update_TimerText();

      this.Enable_GameOver(false);
      
      this.Run_Tick();
   }

   private Run_Tick() {

      this._timer = this.time.addEvent({
         delay: 1000,
         callback: this.Count_Time,
         callbackScope: this,
         loop: true
      });
   }

   private Count_Time() {
      // console.log(`Count_Time => ${this._sec} sec`);

      this._sec -= 1;

      let isGameOver = false;
      if(this.Is_GameOver()) {
         this._sec = 0;
         isGameOver = true;
      }      

      this.Update_TimerText();

      if(isGameOver) {
         this.Enable_GameOver(true);
      }
   }

   Enable_GameOver(__enable: boolean) {

      if(__enable)
         this.time.removeEvent(this._timer);
      
      let curtainState = (__enable ? HUD_Curatin_State.default : HUD_Curatin_State.NONE);
      this.Enable_Curtain(curtainState);

      this._text_FinalScore.setVisible(__enable);
      if(__enable) {
         this._text_FinalScore.setText(this._socre.toString());
      }
      this._text_GameOver.setVisible(__enable);

      this._text_Retry.setVisible(false);

      if(__enable) {
         this.Show_RetryButton();
      }
   }

   private Show_RetryButton() {
      // console.log(`Show_RetryButton`);

      this.time.addEvent({
         delay: 1000,
         callback: () => {
            // console.log("Show_RetryButton complete ~~!!");
            this._text_Retry.setVisible(true);
         },
         callbackScope: this,
      });
   }

   Is_GameOver(): boolean {
      return (0 >= this._sec);
   }

   private Update_TimerText() {
      this._text_Timer.setText(this._sec.toString());
   }

   Set_Score(__score: number) {
      this._socre = __score;
      this._text_Score.setText(__score.toString());
   }

   Bonus() {
      this._sec += 1;
      if(FullTimeSeconds < this._sec) {
         this._sec = FullTimeSeconds;
      }

      this.Update_TimerText();
   }

   Enable_Curtain(__state: HUD_Curatin_State) {
      // console.log(`Enable_Curtain(${__state})`);

      let show = (HUD_Curatin_State.NONE == __state
         ? false
         : true);

      if(!show
         && this.Is_GameOver()
         ) {
            show = true;
            __state = HUD_Curatin_State.default;
      }
      
      this._curtain.setVisible(show);
      if(show) {
         let alpha = (HUD_Curatin_State.weak == __state
            ? 0.01
            : 0.75);
         this._curtain.setAlpha(alpha);
      }
   }
}

const FullTimeSeconds: number = 3;