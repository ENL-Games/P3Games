import Phaser from "phaser";
import GameScene from "~/scenes/GameScene";
import { Async_Pause } from "~/Utils";
import zNode from "../zNode";
import BoardChip from "./BoardChip";

export default class Board extends zNode {

   _chips: BoardChip[] = [];

   _list_Sequence: number[] = [];
   _blankSeq: number = -1;

   constructor(__scene) {
      super(__scene);

      // {//BG
      // let bg = __scene.add.image(__scene.sys.canvas.width /2, __scene.sys.canvas.height / 2, `yd-kkang`);
      // this.Add_ContainerItem(bg);
      // bg.setAlpha(0.5);
      // }
      this.Add_ChipSheet(__scene);

      let bg = __scene.add.rectangle(__scene.sys.canvas.width /2, __scene.sys.canvas.height / 2, 600, 600, 0xf1200c);
      // this.setSize(600, 600);
      this.Add_ContainerItem(bg);

      let boxOutline = this.scene.add.rectangle(__scene.sys.canvas.width /2, __scene.sys.canvas.height / 2, 610, 610);
      {
         this.Add_ContainerItem(boxOutline);
         boxOutline.setStrokeStyle(10, 0xf1200c);
         // boxOutline.setAlpha(0.5);
      }
   }

   Setup_Game() {

      for(let n=0; n<this._chips.length; n++) {
         this._chips[n].destroy();
      }
      this._chips = [];

      this._list_Sequence = [];
      this._blankSeq = -1;

      for(let n=0; n<16; n++) {
         let chip = new BoardChip(this.scene, this, n, n, `puzzle-kkang`);
         this._chips.push(chip);
      }

      this.Shuffle_Chips();
   }

   private async Shuffle_Chips() {
      await Async_Pause(1000);

      let orders: number[] = [];
      {//shuffle
         for (let n = 0; n < 16; n++) {
            orders.push(n);
         }
         // console.log(orders);
         orders.sort(() => Math.random() - 0.5);
         // console.log(orders);
      }

      for(let n=0; n<16; n++) {
         this._chips[n].Update_Position(orders[n]);
         this._chips[n].Show_Number(true);
         this._chips[n].Show_Outline(true);

         this._list_Sequence[n] = orders[n];
      }
      {//last chip delete
         this._blankSeq = this._list_Sequence[15];
         this._chips[15].setVisible(false);
      }

      this.Enable_ChipsCollider();
   }

   Enable_ChipsCollider() {
      // console.log(this._list_Sequence);
      // console.log(`_blankSeq= ${this._blankSeq}`);

      let indexList_CollideChip = this.Find_IndexList_CollideChip(this._blankSeq);

      this._list_Sequence.forEach((v, i, a) => {
         let enableCollide = (-1 != indexList_CollideChip.indexOf(v));
         this._chips[i].Enable_Collider(enableCollide);

         // {//DEBUG LOG
         //    if (enableCollide) {
         //       let index = this._chips[i].Index;
         //       console.log(
         //          `enableCollide> sequence= ${this._list_Sequence[i]}, index= ${index}, number= ${index + 1}`
         //       );
         //    }
         // }
      });
   }

   Add_ChipSheet(__scene) {

      let puzzle = 'puzzle-kkang';
      for (let n = 0; n < 16; n++) {
         __scene.anims.create({
            key: `${puzzle}-${n}`,
            frames: __scene.anims.generateFrameNumbers(puzzle, { frames: [n] }),
         });
      }
   }

   Find_IndexList_CollideChip(__seqBlank: number): number[] {
      let ret: number[] = [];
      if(-1 != __seqBlank) {
         let indexL = -1;
         let indexT = -1;
         let indexR = -1;
         let indexB = -1;

         if(-1 == [0, 4, 8, 12].indexOf(__seqBlank)) {
            indexL = __seqBlank - 1;
         }
         if(4 <= __seqBlank) {
            indexT = __seqBlank - 4;
         }
         if(-1 == [3, 7, 11, 15].indexOf(__seqBlank)) {
            indexR = __seqBlank + 1;
         }
         if(12 > __seqBlank) {
            indexB = __seqBlank + 4;
         }

         let list = [ indexL, indexT, indexR, indexB ];
         list.forEach((v, i, a) => {
            if(-1 != v) {               
               ret.push(v);
            }
            // else {
            //    console.log(`[${i}] ${v}`);
            // }
               
         });
         // console.log(ret);
      }
      return ret;
   }

   Tapped_Chip(__chip: BoardChip) {
      let index = __chip.Index;

      // let sequence = this._list_Sequence[index];
      // console.log(`Tapped_Chip(index= ${index}, sequence= ${sequence})`);

      this._chips[index].Sliding_ToBlank(this._blankSeq);

      this.Get_Scene().Get_GameHUD()
         .Add_Count();
   }

   End_ChipSliding(__chip: BoardChip) {
      let index = __chip.Index;

      let sequence = this._list_Sequence[index];
      // console.log(`End_ChipSliding(index= ${index}, sequence= ${sequence} => ${this._blankSeq})`);
      
      //마지막 칩 위치 변경
      this._list_Sequence[15] = sequence;
      this._chips[15].Update_Position(sequence);
      
      this._list_Sequence[index] = this._blankSeq;//이동한 칩의 seq 변경
      this._blankSeq = sequence;//빈 seq에 이동한 칩의 seq 대입

      this.Enable_ChipsCollider();
   }

   private Get_Scene(): GameScene {
      return this.scene as GameScene;
   }
}