import Phaser from "phaser";

export class GameSelectBox extends Phaser.GameObjects.Container {

   _box!: Phaser.GameObjects.Rectangle;
   _text!: Phaser.GameObjects.Text;

   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      this._box = this.scene.add.rectangle(0, 0, 720, 60
         , 0x000000);
      {
         this.Add_ContainerItem(this._box);
         this._box.setAlpha(0.75);

         let boxOutline = this.scene.add.rectangle(0, 0, 720, 60);
         this.Add_ContainerItem(boxOutline);
         boxOutline.setStrokeStyle(3, 0xffff00);

         this._text = this.scene.add.text(0, 0, "");
         this.Add_ContainerItem(this._text);
         this._text.setOrigin(0.5, 0.5);
         this._text.setColor(`#ffffff`);
         this._text.setFontSize(22);
      }
   }

   Set_Text(__text: string) {
      this._text.setText(__text);
   }

   private Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }
}