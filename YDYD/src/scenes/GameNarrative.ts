import Phaser from 'phaser';

export /*default*/ class GameNarrative extends Phaser.GameObjects.Container {

   private _curtain!: Phaser.GameObjects.Rectangle;

   _content: string[] = [
      "결정했으면 빨리 움직여야지.",
      "나는 핸드폰만 집어든 채 살그머니 문을 열고 밖으로 나왔다.",
      "어둡긴 했지만, 적응이 된 터라 희미하게나마 주변이 보였다.",
      "적어도 사람이 있지는 않은 것 같았다.",
      "만약 그가 들어왔떠라면, 내 방을 알고 있는 그는 내 방을 향해 일직선으로 올 것이니, 다른 방 안에 있을리 없다.",
      "그러니 이 집에는 사람이 없다고 생각해도 된다.",
   ];

   _wordIndex: number = 0;
   _lineIndex: number = 0;

   _line: string[] = [];

   _wordDelay: number = 120;
   _lineDelay: number = 400;

   _objText!: Phaser.GameObjects.Text;

   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      this._curtain = this.scene.add.rectangle(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height / 2
         , this.scene.sys.canvas.width, this.scene.sys.canvas.height
         , 0x000000);
      {
         this._curtain.setAlpha(0.75);

         this._curtain.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            // console.log("예외처리");
            this.Tapped_Screen();
         });//이벤트 처리

         this.Add_ContainerItem(this._curtain);

         this._curtain.setVisible(false);
      }

      this._objText = this.scene.add.text(30, 30, "");
      {
         this._objText.setColor(`#00ff00`);
         this._objText.setLineSpacing(10);

         this.Add_ContainerItem(this._objText);
      }

      this.Ready();
   }

   Ready() {

      this.scene.time.addEvent({
         delay: 1500,
         callback: this.Begin_Narrative,
         callbackScope: this,
      });
   }

   Begin_Narrative() {

      this._curtain.setVisible(true);
      this.NextLine();
   }

   NextLine() {

      if (this._lineIndex === this._content.length) {
         //  We're finished
         return;
      }

      //  Split the current line on spaces, so one word per array element
      this._line = this._content[this._lineIndex].split(' ');

      //  Reset the word index to zero (the first word in the line)
      this._wordIndex = 0;

      //  Call the 'nextWord' function once for each word in the line (line.length)
      this.scene.time.addEvent({
         delay: this._wordDelay,
         callback: this.NextWord,
         callbackScope: this,
         repeat: this._line.length - 1,
      });

      //  Advance to the next line
      this._lineIndex++;
   }

   NextWord() {

      //  Add the next word onto the text string, followed by a space
      this._objText.text = this._objText.text.concat(this._line[this._wordIndex] + " ");
      // console.log(this._line[this._wordIndex]);

      //  Advance the word index to the next word in the line
      this._wordIndex++;

      //  Last word?
      if (this._wordIndex === this._line.length) {
         //  Add a carriage return
         this._objText.text = this._objText.text.concat("\n");

         console.log(`NextWord: complete -> ${this._lineIndex}`);

         // //  Get the next line after the lineDelay amount of ms has elapsed
         // this.scene.time.addEvent({
         //    delay: this._lineDelay,
         //    callback: this.NextLine,
         //    callbackScope: this,
         //    // repeat: this._line.length,
         // });
      }     
   }

   private Tapped_Screen() {
      this.NextLine();
   }

   private Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }

   destroy(fromScene?: boolean | undefined): void {
      // console.log(`destroy() <= ${this._num}`);

      super.destroy(fromScene);
   }
}