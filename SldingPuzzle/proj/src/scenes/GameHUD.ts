import Phaser from 'phaser';
import Thumbnail from '~/obje/Thumbnail';
import zNode from '~/zNode';

export default class GameHUD extends zNode {

   _count: number = 0;
   _txt_Count!: Phaser.GameObjects.Text;

   constructor(__scene) {
      super(__scene);

      let thumb = new Thumbnail(__scene);

      this._txt_Count = __scene.add.text(__scene.sys.canvas.width - 20, 64, `0`);
      {
         this.Add_ContainerItem(this._txt_Count);

         this._txt_Count.setOrigin(1, 0.5);
         this._txt_Count.setStyle({
            font: "bold 100px Arial",
         });
         this._txt_Count.setColor(`#000000`);
         this._txt_Count.setStroke(`#ffffff`, 4);
      }
   }

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