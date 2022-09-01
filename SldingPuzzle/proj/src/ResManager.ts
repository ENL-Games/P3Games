const PuzzleKey = [
   ``
];

class ResManager {
   static readonly PuzzleKeys = [
      `kkang`,
      `club`,
      `ship`,
      `hak`,
      `shadow`,
      `kkcity`,
   ];

   constructor() {}

   static Get_Puzzle_Count(): number {
      return ResManager.PuzzleKeys.length;
   }
   static Get_Puzzle_ThumbKey(__index: number): string {
      return `thumb-${ResManager.PuzzleKeys[__index]}`;
   }
   static Get_Puzzle_SpriteSheet(__index: number): string {
      return `puz-${ResManager.PuzzleKeys[__index]}`;
   }
}

export {
   ResManager,
}