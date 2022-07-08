import Phaser from 'phaser';
import GameScene from '~/scenes/GameScene';

export /*default*/ class Number extends Phaser.GameObjects.Graphics{

   private _num: number = 0;

   POSITION!: Phaser.Math.Vector2;

   private _outline!: Phaser.GameObjects.Arc;
   private _text!: Phaser.GameObjects.Text;   
   
   constructor(__scene) {
      super(__scene);
   }

   Setup(__number: number, __position: Phaser.Math.Vector2) {

      this._num = __number;
      this.POSITION = __position;

      this._outline = this.scene.add.circle(__position.x, __position.y, NumberRadius);
      {
         this._outline.setStrokeStyle(4, NumberColor2.color);

         this._outline.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            this.Hit();
         });//이벤트 처리
      }

      this._text = this.scene.add.text(__position.x, __position.y, __number.toString());
      {
         this._text.setOrigin(0.5, 0.5);
         this._text.setStyle({
            font: "bold 30px Arial"
         });
         this._text.setColor(NumberColor2.rgba);
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

const NumberRadius: number = 24;
const NumberColor2 = Phaser.Display.Color.IntegerToColor(0xff0000);

export {
	NumberRadius
}