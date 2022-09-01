import Phaser from "phaser";
import Board from "~/obje/Board";
import GameHUD from "./GameHUD";

export default class GameScene extends Phaser.Scene {

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

        let board = new Board(this);
        this._GameHUD = new GameHUD(this);

        board.Setup_Game();
    }

    Get_GameHUD(): GameHUD {
        return this._GameHUD;
    }
}