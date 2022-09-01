import Phaser from "phaser";
import Board from "~/obje/Board";
import GameHUD from "./GameHUD";

export default class GameScene extends Phaser.Scene {

    _Board!: Board;
    _GameHUD!: GameHUD;

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
        this._GameHUD = new GameHUD(this);

        this.Reset_Game();
    }

    Reset_Game() {
        console.log(`Reset_Game`);

        this._Board.Setup_Game();
        this._GameHUD.Reset_Count();
    }

    Get_GameHUD(): GameHUD {
        return this._GameHUD;
    }
}