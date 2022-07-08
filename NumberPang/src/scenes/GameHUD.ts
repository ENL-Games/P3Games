import Phaser from 'phaser';

export default class GameHUD extends Phaser.Scene {

   private _timer!: Phaser.Time.TimerEvent;
   private _text_Timer!: Phaser.GameObjects.Text;
   private _sec: number = 0;

   private _curtain!: Phaser.GameObjects.Rectangle;

   constructor() {
      super({ key: 'GameHUD' })
   }

   preload() {
   }

   create() {
      this._text_Timer = this.add.text(this.sys.canvas.width / 2, 54, "0");
      {
         this._text_Timer.setOrigin(0.5, 0.5);
         this._text_Timer.setStyle({
            font: "bold 50px Arial"
         });
      }

      this._sec = FullTimeSeconds;
      this.Update_TimerText();

      this._curtain = this.add.rectangle(this.sys.canvas.width / 2, this.sys.canvas.height / 2
         , this.sys.canvas.width, this.sys.canvas.height
         , 0x000000);
      {
         this._curtain.setAlpha(0.75);
         this._curtain.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            // console.log("예외처리");
         });//이벤트 처리
         
         this.Enable_Curtain(false);
      }

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
      if(0 >= this._sec) {
         this._sec = 0;
         isGameOver = true;
      }      

      this.Update_TimerText();

      if(isGameOver) {
         this.time.removeEvent(this._timer);
         
         this.Enable_Curtain(true);
      }
   }

   private Update_TimerText() {
      this._text_Timer.setText(this._sec.toString());
   }

   Enable_Curtain(__show: boolean) {
      this._curtain.setVisible(__show);
   }
}

const FullTimeSeconds: number = 5;