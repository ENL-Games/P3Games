import Phaser from 'phaser';

export default class IntroScene extends Phaser.Scene {

   private _text_Title!: Phaser.GameObjects.Text;

   constructor() {
      super({ key: 'IntroScene' })
   }

   preload() {
   }

   create() {
      let canvasWidth = this.sys.canvas.width;
      let canvasHeight = this.sys.canvas.height;

      this.add.image(canvasWidth / 2, canvasHeight / 2, 'bg-intro');

      this._text_Title = this.add.text(canvasWidth / 2, 200, `2072 영도`);
      {
         this._text_Title.setOrigin(0.5, 0.5);
         this._text_Title.setStyle({
            font: "bold 100px Arial"
         });

         this._text_Title.setColor(`#00ff00`);

         const gradient = this._text_Title.context.createLinearGradient(0, 0, 0, this._text_Title.height);
         {
            gradient.addColorStop(0, '#ff974b');
            gradient.addColorStop(.5, '#fff435');
            gradient.addColorStop(1, '#ff9543');
         }
         this._text_Title.setFill(gradient);

         // this._text_Title.setVisible(false);
      }
   }
}