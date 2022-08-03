import Phaser from "phaser";
import { GameSelector } from "./GameSelector";

export class GameSelectBox extends Phaser.GameObjects.Container {

   _boxOutline!: Phaser.GameObjects.Rectangle;
   _text!: Phaser.GameObjects.Text;

   constructor(__scene, __selector: GameSelector, __index: number) {
      super(__scene);
      __scene.add.existing(this);

      let box = this.scene.add.rectangle(0, 0, 720, 60
         , 0x000000);
      {
         this.Add_ContainerItem(box);
         box.setAlpha(0.75);

         this._boxOutline = this.scene.add.rectangle(0, 0, 720, 60);
         this.Add_ContainerItem(this._boxOutline);
         // this._boxOutline.setStrokeStyle(3, 0xffff00);
         this.Set_OutlineColor();

         this._text = this.scene.add.text(0, -5, "");
         this.Add_ContainerItem(this._text);
         this._text.setOrigin(0.5, 0.5);
         this._text.setColor(`#ffffff`);
         this._text.setFontSize(22);
      }

      this._boxOutline.setInteractive().on('pointerover', (pointer, localX, localY) => {
         // console.log("over: " + this._text.text);
         this.Set_OutlineColor('pointerover');
      });//이벤트 처리
      this._boxOutline.setInteractive().on('pointerout', (pointer, localX, localY) => {
         // console.log("out: " + this._text.text);
         this.Set_OutlineColor('pointerout');
      });//이벤트 처리

      this._boxOutline.setInteractive().on('pointerdown', (pointer, localX, localY) => {
         // console.log('down: ' + this._text.text);
         __selector.OnClick_SelectBox(__index);
      });//이벤트 처리
   }

   private Set_OutlineColor(__event: string = "") {
      let color = 0xffff00;
      if('pointerover' == __event)
         color = 0x00ffff;
      this._boxOutline.setStrokeStyle(3, color);
   }

   Set_Text(__text: string) {
      let text = `\n` + __text;
      this._text.setText(text);
   }

   private Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }
}