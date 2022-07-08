import Phaser from 'phaser';
import GameScene from '~/scenes/GameScene';

export default class Number extends Phaser.GameObjects.Graphics{

   private _num: number = 0;

   private _outline!: Phaser.GameObjects.Arc;
   private _text!: Phaser.GameObjects.Text;
   
   constructor(__scene) {
      super(__scene);
   }

   Setup(__number: number, __x: number, __y: number) {

      this._num = __number;

      this._outline = this.scene.add.circle(__x, __y, 24);
      {
         this._outline.setStrokeStyle(4, 0xffffff);

         this._outline.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            this.Hit();
         });//이벤트 처리
      }

      this._text = this.scene.add.text(__x, __y, __number.toString());
      {
         this._text.setOrigin(0.5, 0.5);
         this._text.setStyle({
            font: "bold 30px Arial"
         });
      }
   }

   Hit() {
      let gamescene = this.scene as GameScene;
      gamescene.HitTheNumber(this._num);

      this._outline.destroy(true);
      this._text.destroy(true);

      this.destroy(true);
   }
}