import Phaser from 'phaser';
import GameScene from '~/scenes/GameScene';

export /*default*/ class Number extends Phaser.GameObjects.Graphics{

   private _num: number = 0;

   POSITION!: Phaser.Math.Vector2;

   private LT!: Phaser.Math.Vector2;
   private RB!: Phaser.Math.Vector2;

   private _outline!: Phaser.GameObjects.Arc;
   private _text!: Phaser.GameObjects.Text;   
   
   constructor(__scene) {
      super(__scene);
   }

   Setup(__number: number, __position: Phaser.Math.Vector2) {

      this._num = __number;
      this.POSITION = __position;
      {
         this.LT = new Phaser.Math.Vector2(0, 0);

         let Radius_Correction = (NumberRadius * 2) + /*5*/10;//범위 보정값
         this.LT.x = this.POSITION.x - Radius_Correction;
         this.LT.y = this.POSITION.y - Radius_Correction;

         this.RB = new Phaser.Math.Vector2(0, 0);
         this.RB.x = this.POSITION.x + Radius_Correction;
         this.RB.y = this.POSITION.y + Radius_Correction;
      }

      this._text = this.scene.add.text(__position.x, __position.y, __number.toString());
      {
         this._text.setOrigin(0.5, 0.5);
         this._text.setStyle({
            font: "bold 48px Arial"
         });
         this._text.setColor(NumberColor2.rgba);
      }

      this._outline = this.scene.add.circle(__position.x, __position.y, NumberRadius);
      {
         this._outline.setStrokeStyle(8, NumberColor2.color);

         this._outline.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            this.Hit();
         });//이벤트 처리
      }
   }

   Hit() {
      let gamescene = this.scene as GameScene;
      gamescene.HitTheNumber(this._num);
   }

   Destory() {
      // console.log(`[${this._num}] Destory`);

      this._outline.destroy(true);
      this._text.destroy(true);

      this.destroy(true);
   }

   Is_Collision(__pos: Phaser.Math.Vector2): boolean {

      // console.log(`pos= ${__pos.x}, ${__pos.y}\tLT= ${this.LT.x}, ${this.LT.y}\tRB= ${this.RB.x}, ${this.RB.y}`);

      let ret = false;
      if(
         this.LT.x < __pos.x
         && this.RB.x > __pos.x
         && this.LT.y < __pos.y
         && this.RB.y > __pos.y
         ) {
         ret = true;
      }

      // console.log(ret);

      return ret;
   }
}

const NumberRadius: number = 36;
const NumberColor2 = Phaser.Display.Color.IntegerToColor(0xffffff);

export {
	NumberRadius
}