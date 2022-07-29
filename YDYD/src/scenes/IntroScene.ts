import Phaser from 'phaser';

export default class IntroScene extends Phaser.Scene {

   private _text_Title!: Phaser.GameObjects.Text;

   private _txtBtn_NewGame!: Phaser.GameObjects.Text;
   private _txtBtn_Load!: Phaser.GameObjects.Text;
   private _txtBtn_Config!: Phaser.GameObjects.Text;

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

         this._text_Title.setVisible(false);
      }

      this.Setup_TextButtons(canvasWidth, canvasHeight);

      this.Visible_UI();
   }

   Setup_TextButtons(__canvasWidth: number, __canvasHeight: number) {

      let X_TxtButton = this.sys.canvas.width - 20;

      let YInterval_TxtButton = 60;
      let YBottom_TxtButton = __canvasHeight - 60;

      let PY = YBottom_TxtButton;

      this._txtBtn_Config = this.add.text(X_TxtButton, YBottom_TxtButton, "설정");
      {
         this._txtBtn_Config.setOrigin(1, 0.5);
         this._txtBtn_Config.setStyle({
            font: "bold 40px Arial"
         });
         this._txtBtn_Config.setColor(`#7d7d7d`);

         // this._txtBtn_Config.setInteractive().on('pointerdown', (pointer, localX, localY) => {
         //    console.log("설정");
         // });//이벤트 처리

         this._txtBtn_Config.setVisible(false);
      }

      PY -= YInterval_TxtButton;
      this._txtBtn_Load = this.add.text(X_TxtButton, PY, "불러오기");
      {
         this._txtBtn_Load.setOrigin(1, 0.5);
         this._txtBtn_Load.setStyle({
            font: "bold 40px Arial"
         });
         this._txtBtn_Load.setColor(`#7d7d7d`);

         // this._txtBtn_Load.setInteractive().on('pointerdown', (pointer, localX, localY) => {
         //    console.log("불러오기");
         // });//이벤트 처리

         this._txtBtn_Load.setVisible(false);
      }

      PY -= YInterval_TxtButton;
      this._txtBtn_NewGame = this.add.text(X_TxtButton, PY, "새 게임");
      {
         this._txtBtn_NewGame.setOrigin(1, 0.5);
         this._txtBtn_NewGame.setStyle({
            font: "bold 40px Arial"
         });

         this._txtBtn_NewGame.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            console.log("새 게임");
         });//이벤트 처리

         this._txtBtn_NewGame.setVisible(false);
      }
   }

   Visible_UI() {

      //_text_Title visible
      this.tweens.add({
         targets: this._text_Title,
         alpha: { value: 1, duration: 1000 },
         scale: { value: 1, duration: 1000 },

         onStart: () => {
            this._text_Title.setScale(0, 0);
            this._text_Title.setAlpha(0);
            this._text_Title.setVisible(true);
         },

         onComplete: () => {
            // this._text_Title.setAlpha(1);
         }
      });
   }
}