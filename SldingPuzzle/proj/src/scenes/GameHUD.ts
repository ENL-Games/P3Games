import Phaser from 'phaser';
import Thumbnail from '~/obje/Thumbnail';

export default class GameHUD extends Phaser.Scene {

   _count: number = 0;
   _txt_Count!: Phaser.GameObjects.Text;

   constructor() {
      super({ key: 'GameHUD' });
   }

   preload() {}

   create() {
      let thumb = new Thumbnail(this);

      this._txt_Count = this.add.text(this.sys.canvas.width - 20, 64, `0`);
      {
         this._txt_Count.setOrigin(1, 0.5);
         this._txt_Count.setStyle({
            font: "bold 100px Arial",
         });
         this._txt_Count.setColor(`#000000`);
         this._txt_Count.setStroke(`#ffffff`, 4);
      }
   }
   // update(t, dt) {}

   Reset_Count() {
      this._count = 0;

      this.Update_Count();
   }
   Add_Count() {
      this._count += 1;

      this.Update_Count();
   }
   Update_Count() {
      this._txt_Count.setText(this._count.toString());
   }
}