import Phaser from 'phaser';

import { Number, NumberRadius } from '../obj/Number';
import GameHUD, { HUD_Curatin_State } from './GameHUD';

export default class GameScene extends Phaser.Scene {

   CanvasWidth: number = 0;
   CanvasHeight: number = 0;

   _firstNum: number = 0;
   _lastNum: number = 0;

   _dict_Number!: Map<number, Number>;

   constructor() {
      super({ key: 'GameScene' })
   }

   preload() {
      this.load.image('bg', 'assets/bg.png');
   }

   create() {
      this.scene.run('GameHUD');      

      this.CanvasWidth = this.sys.canvas.width;
      this.CanvasHeight = this.sys.canvas.height;

      this.add.image(this.CanvasWidth / 2, this.CanvasHeight / 2, 'bg');

      this._dict_Number = new Map();

      this.Game_Start();
   }

   Retry_Game() {
      if(0 < this._dict_Number.size) {
         for(const [key, values] of this._dict_Number) {
            values.Destory();
         }

         this._dict_Number.clear();
      }

      this._firstNum = 1;
      this._lastNum = 0;

      this.Game_Start();
   }

   private Game_Start() {
      this._firstNum = 1;
      
      let initCount = Phaser.Math.Between(3, 5);

      // { initCount = 100; }//TEST
      // { initCount = 2; }//TEST

      for(var n=0; n<initCount; n++) {
         this.Generate_Number();
      }
   }

   private Generate_Number(): Number {

      this._lastNum += 1;
      let number = this.Make_Number(this._lastNum);

      this._dict_Number.set(this._lastNum, number);

      // for(const [key, values] of this._dict_Number) {
      //    console.log(`[${key}] = ${values}`);
      // }

      return number;
   }

   private Make_Number(__number: number): Number {
      let number = new Number(this);

      let pos = this.Get_Position();
      // console.log(`[${__number}] pos= ${pos.x}, ${pos.y}`);
      number.Setup(__number, pos);

      return number;
   }

   private Get_Position(): Phaser.Math.Vector2 {
      let pos = new  Phaser.Math.Vector2(0, 0);

      while (true) {
         pos = this.Get_RandomPosition();

         let isCollision = false;
         for (const [key, values] of this._dict_Number) {
            // console.log(`[${key}] = ${values}`);

            if (values.Is_Collision(pos)) {
               isCollision = true;
               break;
            }
         }

         if(!isCollision)
            break;
      }

      return pos;
   }

   private Get_RandomPosition(): Phaser.Math.Vector2 {

      let minmin = 0 + NumberRadius;
      let maxX = this.CanvasWidth - NumberRadius;
      let maxY = this.CanvasHeight - NumberRadius;

      let pos = new  Phaser.Math.Vector2(0, 0);
      pos.x = Phaser.Math.Between(minmin, maxX);
      pos.y = Phaser.Math.Between(minmin, maxY);

      // {//TEST - collision
      //    let posList = [
      //       new Phaser.Math.Vector2(244, 239),
      //       new Phaser.Math.Vector2(269, 273),
      //    ];
      //    pos = posList[this.dbgCount++];
      // }//dbgCount: number = 0;

      return pos;
   }

   private Diasble_HUD_Curtain() {
      this.Get_GameHUD()
         .Enable_Curtain(HUD_Curatin_State.NONE);
   }

   private Get_GameHUD(): GameHUD {
      return this.scene.get('GameHUD') as GameHUD;
   }

   HitTheNumber(__number: number) {
      // console.log(`HitTheNumber(${__number})`);

      // let log = 'BEFORE';
      // for(const [key, values] of this._dict_Number) {
      //    log += `\n\t[${key}] = ${values}`;
      // }

      if(this._firstNum != __number) {
         // console.log("Wrong~~");
         
         var HUD = this.scene.get('GameHUD') as GameHUD;
         // console.log(HUD);

         this.cameras.main.shake(TimeOfShake, 0.02);

         this.Get_GameHUD()
            .Enable_Curtain(HUD_Curatin_State.weak);

         this.time.addEvent({
            delay: TimeOfShake,
            callback: this.Diasble_HUD_Curtain,
            callbackScope: this,
         });
         return;
      }

      this.Get_GameHUD()
         .Bonus();

      this._dict_Number.get(__number)?.Destory();
      this._dict_Number.delete(__number);

      // log += '\nAFTER';
      // for(const [key, values] of this._dict_Number) {
      //    log += `\n\t[${key}] = ${values}`;
      // }
      // console.log(log);

      this._firstNum += 1;
      this.Generate_Number();
   }
}

const TimeOfShake:number = 300;
