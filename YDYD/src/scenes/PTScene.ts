import Phaser from 'phaser';

export default class PTScene extends Phaser.Scene {

   _bgs!: Phaser.GameObjects.Image[];
   _indexBG: number = 0;
   
   constructor() {
      super({ key: 'PTScene' })
   }

   preload() {
   }

   create() {
      let canvasWidth = this.sys.canvas.width;
      let canvasHeight = this.sys.canvas.height;

      this._bgs = [];
      for(var n=0; n<4; n++) {
         let tKey = `bg-ppt-${n}`;
         this._bgs.push(this.add.image(canvasWidth / 2, canvasHeight / 2, tKey));

         this._bgs[n].setVisible(false);
      }

      this._indexBG = 0;
      this.Update_BG();

      this.input.on('pointerdown', (pointer, localX, localY) => {
         this.Tapped_Screen();
      });//이벤트 처리

      // this.input.on('pointerdown', this.Tapped_Screen);
   }

   Tapped_Screen() {
      this._indexBG += 1;
      console.log(`Tapped_Screen(): ${this._indexBG}`);
      
      this.Update_BG();

      if(this._bgs.length <= this._indexBG + 1) {
         this.input.off('pointerdown');
      }
   }

   Update_BG() {
      for(var n=0; n<this._bgs.length; n++) {

         let visible: boolean = (n == this._indexBG ? true : false);
         this._bgs[n].setVisible(visible);
      }
   }
}