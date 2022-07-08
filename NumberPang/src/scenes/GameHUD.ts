import Phaser from 'phaser';

export default class GameHUD extends Phaser.Scene {

   private _text_Timer!: Phaser.GameObjects.Text;

   constructor() {
      super({ key: 'GameHUD' })
   }

   preload() {
   }

   create() {
      this._text_Timer = this.add.text(this.sys.canvas.width / 2, 54, "5");
      {
         this._text_Timer.setOrigin(0.5, 0.5);
         this._text_Timer.setStyle({
            font: "bold 50px Arial"
         });
      }
   }
}