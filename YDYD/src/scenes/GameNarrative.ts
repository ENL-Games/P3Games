import Phaser from 'phaser';

import GameScene from './GameScene';

export /*default*/ class GameNarrative extends Phaser.GameObjects.Container {

   private _curtain!: Phaser.GameObjects.Rectangle;

   _content: string[] = [];

   _wordIndex: number = 0;
   _lineIndex: number = 0;

   _line: string[] = [];

   _wordDelay: number = 30;
   _lineDelay: number = 400;

   _objText!: Phaser.GameObjects.Text;

   _isCan_Touch: boolean = false;

   constructor(__scene) {
      super(__scene);
      __scene.add.existing(this);

      this._curtain = this.scene.add.rectangle(this.scene.sys.canvas.width / 2, this.scene.sys.canvas.height / 2
         , this.scene.sys.canvas.width, this.scene.sys.canvas.height
         , 0x000000);
      {
         this._curtain.setAlpha(0.75);

         this._curtain.setInteractive().on('pointerdown', (pointer, localX, localY) => {
            // console.log("예외처리");
            this.Tapped_Screen();
         });//이벤트 처리

         this.Add_ContainerItem(this._curtain);

         this._curtain.setVisible(false);
      }

      let padding: number = 30;
      this._objText = this.scene.add.text(padding, padding, "");
      {
         this._objText.setColor(`#ffffff`);
         this._objText.setLineSpacing(10);
         this._objText.setFontSize(26);

         this._objText.setWordWrapWidth(this.scene.sys.canvas.width - (padding  *2));

         this.Add_ContainerItem(this._objText);
      }

      // this.Ready();
   }

   Set_Page(__page: number, __isReady: boolean = true) {

      // console.log(`Set_Page(${__page}, ${__isReady})`);

      this._content = Books[__page];
      this._line = [];

      this._wordIndex = 0;
      this._lineIndex = 0;

      if(__isReady) {
         this._objText.setText("");
         this._curtain.setVisible(false);

         this.Ready();
      }
   }

   Ready() {

      this.scene.time.addEvent({
         delay: 1500,
         callback: this.Begin_Narrative,
         callbackScope: this,
      });
   }

   Begin_Narrative() {

      this._curtain.setVisible(true);
      this.NextLine();
   }

   NextLine() {

      if (this._lineIndex === this._content.length) {
         //  We're finished
         return;
      }

      //  Split the current line on spaces, so one word per array element
      this._line = this._content[this._lineIndex].split(' ');

      //  Reset the word index to zero (the first word in the line)
      this._wordIndex = 0;

      //  Call the 'nextWord' function once for each word in the line (line.length)
      this.scene.time.addEvent({
         delay: this._wordDelay,
         callback: this.NextWord,
         callbackScope: this,
         repeat: this._line.length - 1,
      });

      //  Advance to the next line
      this._lineIndex++;
   }

   NextWord() {

      //  Add the next word onto the text string, followed by a space
      this._objText.text = this._objText.text.concat(this._line[this._wordIndex] + " ");
      // console.log(this._line[this._wordIndex]);

      //  Advance the word index to the next word in the line
      this._wordIndex++;

      //  Last word?
      if (this._wordIndex === this._line.length) {
         //  Add a carriage return
         this._objText.text = this._objText.text.concat("\n");

         this._isCan_Touch = true;

         // console.log(`NextWord: complete -> ${this._lineIndex}`);

         // //  Get the next line after the lineDelay amount of ms has elapsed
         // this.scene.time.addEvent({
         //    delay: this._lineDelay,
         //    callback: this.NextLine,
         //    callbackScope: this,
         //    // repeat: this._line.length,
         // });
      }     
   }

   private Tapped_Screen() {

      if(!this._isCan_Touch) {
         console.log(`Tapped_Screen: ${this._isCan_Touch}`);
         return;
      }

      // console.log(`Tapped_Screen(): _lineIndex= ${this._lineIndex}`);
      // console.log(`Tapped_Screen(): _content.length= ${this._content.length}`);

      if (this._lineIndex === this._content.length) {

         let gamescene = this.scene as GameScene;
         gamescene.NextPage();

         return;
      }

      this.NextLine();
      this._isCan_Touch = false;
   }

   private Add_ContainerItem(__item: Phaser.GameObjects.GameObject) {
      this.add(__item);
   }

   destroy(fromScene?: boolean | undefined): void {
      // console.log(`destroy() <= ${this._num}`);

      super.destroy(fromScene);
   }
}

//https://brunch.co.kr/brunchbook/sfnovel-1
const Scenario1: string[] = [
   "2083 년 4 월 15 일 목요일\n",
   "당시 임도훈 씨는 서른세 살의 S전자 인사관리팀장이었다.",
   "인사관리팀장이라고는 해도 팀원이 임도훈씨 한 명뿐인지라", "말단 직원이라고 해도 틀린 말은 아니었다.",
   "2050년대 멀티백 혁명으로 인해 인공지능 컴퓨터가 사회전반의 의사결정을 대신하게 되면서", "인사관리와 같은 의사결정 업무는 컴퓨터가 대신하게 되었다.",
   "멀티백이라는 인공지능 컴퓨터는 임직원들의 성향, 뇌파, 심리상태, 전문성 등을 직무와 매치시키고", "업무성과와 임직원 간 상성을 고려하여 인사발령 및 승진 여부를 결정하였다.",
   "멀티백 혁명 직후에는 컴퓨터의 판단에 대한 인간의 검증과 확인이 필요하여", "인사관리팀 인원이 10명 이상이었으나 5년 전 인간의 개입이 오히려 오류를 일으킨다는 것이 밝혀지면서",
   "인원이 대폭 축소되었다.", "당시 임도훈씨의 업무는 임직원이 인사사항에 대해 이의를 제기할 경우 절차에 따라", "컴퓨터의 판단 근거를 제공하는 것이었다.",
   "매우 단순한 업무이고 업무강도도 높지 않아 그는 회사에서 가장 낮은 연봉을 받고 있었다.",
   "하지만, 이 직업도 멀티백의 추천에 따라 얻게 된 것이므로 그는 별 생각 없이 다녔다."
];

const Scenario2: string[] = [
   "2033년 9월 18일 화요일 오전 7시\n",
   "\“안녕하세요. 좋은 아침입니다.\”",
   "집에서 사용하는 비서 로봇 ‘레오’가 반갑게 인사를 했다.",
   "평소처럼 스케줄과 밀린 이메일을 읽어 주었지만 잠이 덜 깨어 무슨 내용인지 귀에 들어오지도 않았다.", "연구결과를 확인하느라 새벽 3시가 넘어 퇴근하여 3시간도 채 자지 못한 상황이었다.", 
   "조금 늦게 출근해도 되기는 했지만 그러면 일정 내에 개발을 완료하기 어려울 것 같아 억지로 출근시간에 맞춰 일어났다.",
   "아침식사도 거르고 옷을 입고 있는 중에 ‘레오’가 읽어주는 이메일의 단어 하나가 귀에 꽂혔다."
];

const Scenario3: string[] = [
   "그날은 나의 40 번째 생일이었다.",
   "그날은 내가 인생에서 가장 특별한 생일선물을 받은 날이자 인생의 가장 중요한 터닝 포인트가 된 날이기도 했다.",
   "나는 그날을 평생 잊지 못할 것이다.",
   "나는 당시 S물산 건설부문의 기획팀장이었다.",
   "상무 1년 차 팀장이었지만 사장님의 오른팔이라고 할 정도로 회사에서의 영향력이 대단했다.",
   "한국 나이 41살의 임원 승진도 거의 유래가 없을 정도로 빠른 것이었다.",
   "내가 특진을 거듭하여 최연소 임원이 되고 득세할 수 있었던 것은 나의 탁월한 텔레파시 능력 때문이었다.",
   "나는 태어날 때부터 텔레파시 능력을 갖고 있었다.",
   "이유는 알 수 없지만 2000 년대 이후 출생자부터 나 같은 네이티브 텔레 파시스트가 기하급수적으로 증가하였다.",
   "환경호르몬의 영향이라는 얘기도 있었고 방사능 때문이라는 얘기도 있었지만 아직도 그 이유는 밝혀지지 않았다."
];

const Books = [
   Scenario1, Scenario2, Scenario3
];