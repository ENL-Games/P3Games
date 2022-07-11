import Phaser from 'phaser';
import GameScene from '~/scenes/GameScene';

export /*default*/ class Number extends Phaser.GameObjects.Container {

   private _num: number = 0;

   POSITION!: Phaser.Math.Vector2;

   private LT!: Phaser.Math.Vector2;
   private RB!: Phaser.Math.Vector2;

   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);
   }

   private Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }

   private Set_Position(__position: Phaser.Math.Vector2) {

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

      super.setPosition(__position.x, __position.y);
   }

   Setup(__number: number, __position: Phaser.Math.Vector2) {

      // console.log(`Number.Setup(${__number})`);

      this._num = __number;

      {//outline of outline
         let outoutline = this.scene.add.circle(0, 0, NumberRadius + 6);
         outoutline.setStrokeStyle(2, 0x000000);

         this.Add_ContainerItem(outoutline);

         outoutline = this.scene.add.circle(0, 0, NumberRadius - 6);
         outoutline.setStrokeStyle(2, 0x000000);

         this.Add_ContainerItem(outoutline);
      }

      let outline = this.scene.add.circle(0, 0, NumberRadius);
      {
         outline.setStrokeStyle(8, NumberColor2.color);

         outline.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            this.Hit();
         });//이벤트 처리
      }
      this.Add_ContainerItem(outline);

      let text = this.scene.add.text(0, 0, __number.toString());
      {
         text.setOrigin(0.5, 0.5);
         text.setStyle({
            font: "bold 48px Arial"
         });
         text.setColor(NumberColor2.rgba);
         text.setStroke(`#000000`, 8);
      }
      this.Add_ContainerItem(text);

      this.Set_Position(__position);
   }

   Hit() {
      let gamescene = this.scene as GameScene;
      gamescene.HitTheNumber(this._num);
   }

   destroy(fromScene?: boolean | undefined): void {
      super.destroy(fromScene);
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