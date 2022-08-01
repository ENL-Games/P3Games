import Phaser from 'phaser';

import GameScene from './GameScene';

export /*default*/ class GameDialog extends Phaser.GameObjects.Container {

   _char!: Phaser.GameObjects.Image;

   _txtName!: Phaser.GameObjects.Text;
   _txtDialog!: Phaser.GameObjects.Text;

   _dialgos: IDialog[] = [];
   _indexDialog = -1;   

   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      let curtain = this.scene.add.rectangle(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height / 2
         , this.scene.sys.canvas.width, this.scene.sys.canvas.height
         , 0x000000);
      {
         curtain.setAlpha(0.5);

         curtain.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            // console.log("예외처리");
            this.Tapped_Screen();
         });//이벤트 처리

         this.Add_ContainerItem(curtain);

         // curtain.setVisible(false);
      }

      let PY_Char = 450;
      this._char = this.scene.add.image(this.scene.sys.canvas.width / 2, PY_Char, `game-dialog-capgirl`);
      this.Add_ContainerItem(this._char);

      this.Setup_DialogBox();

      {
         this._dialgos[0] = Dialog1;
         this._dialgos[1] = Dialog2;
      }
   }

   Setup_DialogBox() {
      let PY_DialogBox = 620;
      let Width_DialogBox = 1180;
      let Height_DialogBox = 160;

      let box = this.scene.add.rectangle(this.scene.sys.canvas.width / 2, PY_DialogBox
         , Width_DialogBox, Height_DialogBox
         , 0x000000);
      {
         box.setAlpha(0.75);

         let boxOutline = this.scene.add.rectangle(this.scene.sys.canvas.width / 2, PY_DialogBox
            , Width_DialogBox, Height_DialogBox
            );
         boxOutline.setStrokeStyle(5, 0xff00ff);

         let nameTag!: Phaser.GameObjects.Shape;
         let nameTagOutline!: Phaser.GameObjects.Shape;
         {//name
            let PY = 520 + 12;
            let WIDTH = 200;
            let HEIGHT = 32;

            nameTag = this.scene.add.rectangle(50, PY, WIDTH, HEIGHT, 0x000000);
            // nameTag.setAlpha(0.75);
            nameTag.setOrigin(0, 0.5);

            nameTagOutline = this.scene.add.rectangle(50, PY, WIDTH, HEIGHT);
            nameTagOutline.setOrigin(0, 0.5);
            nameTagOutline.setStrokeStyle(5, 0xff00ff);
         }

         this.Add_ContainerItem(box);
         this.Add_ContainerItem(boxOutline);

         this.Add_ContainerItem(nameTag);
         this.Add_ContainerItem(nameTagOutline);
      }

      {
         this._txtName = this.scene.add.text(150, 520 + 12, "-");
         this._txtName.setOrigin(0.5, 0.5);
         this._txtName.setWordWrapWidth(196);
         this.Add_ContainerItem(this._txtName);

         let padding: number = 30;
         this._txtDialog = this.scene.add.text(50 + padding, PY_DialogBox - 56, "ABCDEFGhijklmn\n가나다라마바사\n0123456")
            .setOrigin(0, 0);
         {
            this._txtDialog.setColor(`#ffffff`);
            this._txtDialog.setLineSpacing(10);
            this._txtDialog.setFontSize(24);

            this._txtDialog.setWordWrapWidth(this.scene.sys.canvas.width - (padding  *2));

            this.Add_ContainerItem(this._txtDialog);
         }
      }
   }

   Start_Dialaog() {
      this._indexDialog = 0;
      this.Update_Dialog();
   }

   Update_Dialog() {
      // console.log(`Update_Dialog(): index= ${this._indexDialog}`);

      let dialog = this._dialgos[this._indexDialog];
      // console.log(dialog);

      this._char.setTexture(dialog.portrait);
      this._txtName.setText(dialog.name);
      this._txtDialog.setText(dialog.text);
   }

   IsExist_NextDialog(): boolean {

      return (this._dialgos.length > this._indexDialog);
   }
   Get_DialogIndex(): number {
      return this._indexDialog;
   }

   private Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }

   private Tapped_Screen() {

      this._indexDialog++;

      if(!this.IsExist_NextDialog()) {
         console.log(`Tapped_Screen complete: _indexDialog= ${this._indexDialog}`);
         return;
      }
      this.Update_Dialog();
   }
}

interface IDialog {
   portrait: string;
   name: string;
   text: string;
}

const Dialog1: IDialog = {
   portrait: "game-dialog-capgirl",
   name: "인물 1",
   text: "바보\n멍충이\n똥개"
};
const Dialog2: IDialog = {
   portrait: "game-dialog-sister",
   name: "주연급 1",
   text: "반사!!"
};