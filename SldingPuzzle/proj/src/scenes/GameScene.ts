import Phaser from "phaser";
import Board from "~/obje/Board";
import { ResManager } from "~/ResManager";
import { Async_Pause } from "~/Utils";
import GameHUD from "./GameHUD";

export default class GameScene extends Phaser.Scene {

    _Board!: Board;

    constructor() {
        super({ key: 'GameScene' })
    }

    preload() { }

    create() {
        this.scene.run('GameHUD');

        let canvasWidth = this.sys.canvas.width;
        let canvasHeight = this.sys.canvas.height;

        let bg = this.add.image(canvasWidth / 2, canvasHeight / 2, `bg-game`);
        {
            let box = this.add.rectangle(canvasWidth / 2, canvasHeight / 2
                , canvasWidth, canvasHeight
                , 0x000000);
            box.setAlpha(0.75);
            // bg.setBlendMode(Phaser.BlendModes.DIFFERENCE);
        }

        this._Board = new Board(this);

        this.Start_Game();
    }

    private async Start_Game() {
        await Async_Pause(1);

        this.Reset_Game();
    }

    Reset_Game() {
        // console.log(`Reset_Game`);
        this.Get_GameHUD().Show_Clear(false);
        
        let indexPuzzle = Phaser.Math.Between(0, ResManager.Get_Puzzle_Count() - 1);
        this._Board.Setup_Game(indexPuzzle);

        let HUD = this.Get_GameHUD();
        HUD.Change_Thumbnail(indexPuzzle);
        HUD.Reset_Count();
        HUD.Enable_Curtain(true);
    }

    Clear_Game() {
        this._Board.Clear_Game();
        this.Get_GameHUD().Show_Clear(true);
    }

    Exit_Game() {
        this.scene.sleep(`GameHUD`);
        this.scene.start(`IntroScene`);
    }

    Get_GameHUD(): GameHUD {
        return this.scene.get(`GameHUD`) as GameHUD;
    }
}