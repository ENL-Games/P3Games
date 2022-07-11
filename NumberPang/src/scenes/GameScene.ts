import Phaser from 'phaser';

import { Number, NumberRadius } from '../obj/Number';
import GameHUD, { HUD_Curatin_State } from './GameHUD';
import { ResKey_Images_BGs } from './PreLoader';

export default class GameScene extends Phaser.Scene {

   CanvasWidth: number = 0;
   CanvasHeight: number = 0;

   _firstNum: number = 0;
   _lastNum: number = 0;
   _initCount: number = 0;

   _dict_Number!: Map<number, Number>;

   _bgs!: Phaser.GameObjects.Image[];

   constructor() {
      super({ key: 'GameScene' })
   }

   preload() {
   }

   create() {
      this.scene.run('GameHUD');      

      this.CanvasWidth = this.sys.canvas.width;
      this.CanvasHeight = this.sys.canvas.height;

      
      this._bgs = [];
      for(var n=0; n<ResKey_Images_BGs.length; n++) {
         this._bgs.push(this.add.image(this.CanvasWidth / 2, this.CanvasHeight / 2
            , ResKey_Images_BGs[n]));

         this._bgs[n].setVisible(false);
      }

      this._dict_Number = new Map();
   }

   private Choose_BG() {
      let rnd = Phaser.Math.Between(0, this._bgs.length - 1);

      for(var n=0; n<this._bgs.length; n++) {
         let visible = (rnd == n ? true : false);

         this._bgs[n].setVisible(visible);
      }
   }

   Reset_Game() {
      //console.log(`Reset_Game()`);

      if(0 < this._dict_Number.size) {
         for(const [key, values] of this._dict_Number) {
            values.destroy();
         }

         this._dict_Number.clear();
      }

      this._firstNum = 1;
      this._lastNum = 0;

      this.Game_Start();
   }

   private Game_Start() {
      this.Choose_BG();

      this._firstNum = 1;
      
      let initCount = Phaser.Math.Between(3, 5);

      // { initCount = 30; }//TEST
      // { initCount = 2; }//TEST

      for(var n=0; n<initCount; n++) {
         this.Generate_Number(true);
      }
   }

   private Generate_Number(__isAutoMaked: boolean): Number {

      this._lastNum += 1;
      let number = this.Make_Number(this._lastNum, __isAutoMaked);

      this._dict_Number.set(this._lastNum, number);

      // for(const [key, values] of this._dict_Number) {
      //    console.log(`[${key}] = ${values}`);
      // }

      return number;
   }

   private Make_Number(__number: number, __isAutoMaked: boolean): Number {
      let number = new Number(this);

      let pos = this.Get_Position();
      // console.log(`[${__number}] pos= ${pos.x}, ${pos.y}`);

      number.Setup(__number, pos, __isAutoMaked);

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

      let minX = 460 + NumberRadius;
      let maxX = 1140 - NumberRadius;
      let minY = 230 + NumberRadius;
      let maxY = 900 - NumberRadius;

      let pos = new  Phaser.Math.Vector2(0, 0);
      pos.x = Phaser.Math.Between(minX, maxX);
      pos.y = Phaser.Math.Between(minY, maxY);

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

      let HUD = this.Get_GameHUD();
      if(this._firstNum != __number) {
         // console.log("Wrong~~");
         
         // console.log(HUD);

         this.cameras.main.shake(TimeOfShake, 0.02);

         this.Get_GameHUD()
            .Enable_GameOver(true);
         return;
      }

      this._dict_Number.get(__number)?.Remove();
      this._dict_Number.delete(__number);

      // log += '\nAFTER';
      // for(const [key, values] of this._dict_Number) {
      //    log += `\n\t[${key}] = ${values}`;
      // }
      // console.log(log);

      HUD.Bonus();
      HUD.Set_Score(this._firstNum);

      this._firstNum += 1;
      this.Generate_Number(false);
   }
}

const TimeOfShake:number = 300;
