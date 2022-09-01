import Phaser from "phaser";
import zNode from "../zNode";
import Board from "./Board";

export default class BoardChip extends zNode {

   private _board: Board | undefined = undefined;

   private _index: number = -1;

   private _bg!: Phaser.GameObjects.Sprite;

   private _circle_NumberOuter!: Phaser.GameObjects.Graphics;
   private _circle_NumberInner!: Phaser.GameObjects.Graphics;
   private _text_Number!: Phaser.GameObjects.Text;

   private _rectangle_Outline!: Phaser.GameObjects.Rectangle;

   private _collider: boolean = false;

   get Index(): number {
      return this._index;
   }

   static readonly ChipSize: number = 150;

   constructor(__scene, __board: Board, __index: number, __seq: number, __stage: string) {
      super(__scene);
      this.setSize(BoardChip.ChipSize, BoardChip.ChipSize);

      this._board = __board;

      this._index = __index;
      
      this._bg = __scene.add.sprite(0, 0, ``);
      this._bg.play(`${__stage}-${__index}`);
      this.Add_ContainerItem(this._bg);

      this._circle_NumberOuter = __scene.add.circle(-52, -52, 18, 0x000000);
      {
         this.Add_ContainerItem(this._circle_NumberOuter);
         this._circle_NumberOuter.setAlpha(0.5);

         this._circle_NumberInner = __scene.add.circle(-52, -52, 16, 0xffff00);
         this.Add_ContainerItem(this._circle_NumberInner);
         this._circle_NumberInner.setAlpha(0.5);

         this._text_Number = __scene.add.text(-52, -52, `${__index + 1}`);
         {
            this.Add_ContainerItem(this._text_Number);

            this._text_Number.setOrigin(0.5, 0.5);
            this._text_Number.setStyle({
               font: "bold 20px Arial",
            });
            this._text_Number.setColor(`#ff0000`);
            this._text_Number.setAlpha(0.5);
         }
      }
      this.Show_Number(false);

      this._rectangle_Outline = this.scene.add.rectangle(0, 0, 150, 150);
      {
         this.Add_ContainerItem(this._rectangle_Outline);
         this._rectangle_Outline.setStrokeStyle(1, 0x000000);
         this._rectangle_Outline.setAlpha(0.25);
         this._rectangle_Outline.setVisible(false);
      }

      this.Update_Position(__seq);

      this.setInteractive().on('pointerdown', (pointer, localX, localY) => {
         if (this._collider) {
            // console.log(`pointerdown= ${__index}`);
            __board.Tapped_Chip(this);
         }
      });//이벤트 처리
   }

   Update_Position(__seq) {
      let v2 = BoardChip.Get_Position(__seq);
      this.setPosition(v2.x, v2.y);
      {
         // bg.setPosition(500, 500);
      }
   }

   Show_Number(__show: boolean) {
      this._circle_NumberOuter.setVisible(__show);
      this._circle_NumberInner.setVisible(__show);
      this._text_Number.setVisible(__show);
   }

   Enable_Collider(__enable: boolean) {
      this._collider = __enable;
      {//DEV TEST
         let colorTint: number = (__enable ? 0xffffff : 0x4e4e4e);
         this._bg.tint = colorTint;
      }
   }

   Show_Outline(__show: boolean) {
      this._rectangle_Outline.setVisible(__show);
   }

   Sliding_ToBlank(__blankSequence: number) {      
      let toV2 = BoardChip.Get_Position(__blankSequence);
      // {//DEV LOG
      //    let toP = BoardChip.Get_Pos(__blankSequence);

      //    let LOG = `Sliding_ToBlank(${__blankSequence})`;
      //    LOG += ` => pos= (${toP.x}, ${toP.y}), position= (${toV2.x}, ${toV2.y})`;
      //    LOG += `, MyPosition= (${this.x}, ${this.y})`;
      //    console.log(LOG );
      // }

      let DurationMoving = 200;

      let propsTween;
      if(this.x == toV2.x) {
         propsTween = {
            y: { value: toV2.y, duration: DurationMoving
               // , delay: delay
            }
         }

         // console.log(`Move Y: ${this.y} => ${toV2.y}`);
      }
      else if(this.y == toV2.y) {
         propsTween = {
            x: { value: toV2.x, duration: DurationMoving
               // , delay: delay
            }
         }

         // console.log(`Move X: ${this.x} => ${toV2.x}`);
      }

      this.scene.tweens.add({
         targets: this,
         props: propsTween,
         // ease: Phaser.Math.Easing.Bounce.Out,

         onStart: () => {
            // this.setPosition(pos.x, pos.y - MoveY);
         },
         onComplete: () => {
            this.setPosition(toV2.x, toV2.y);
            this._board?.End_ChipSliding(this);
         }
      });
   }

   private static Get_Position(__order: number): Phaser.Math.Vector2 {
      let v = new Phaser.Math.Vector2(415, 135);
         //= new Phaser.Math.Vector2(300 + 340, 300 + 60);
      let pos = BoardChip.Get_Pos(__order);
      v.x += (BoardChip.ChipSize * pos.x);
      v.y += (BoardChip.ChipSize * pos.y);
      // {//TEST
      //    v.x += (pos.x * 10);
      //    v.y += (pos.y * 10);
      // }
      return v;
   }

   private static Get_Pos(__order: number): Phaser.Math.Vector2 {
      let v = new Phaser.Math.Vector2(0, 0);
      v.x = __order % 4;
      v.y = Phaser.Math.FloorTo(__order / 4);
      return v;
   }
}