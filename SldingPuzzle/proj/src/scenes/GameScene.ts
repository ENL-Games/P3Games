import Phaser from "phaser";
import Board from "~/obje/Board";
import Thumbnail from "~/obje/Thumbnail";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene' })
    }

    preload() { }

    create() {
        let canvasWidth = this.sys.canvas.width;
        let canvasHeight = this.sys.canvas.height;

        this.add.image(canvasWidth / 2, canvasHeight / 2, `bg-game`);
        {
            let box = this.add.rectangle(canvasWidth / 2, canvasHeight / 2
                , canvasWidth, canvasHeight
                , 0x000000);
            box.setAlpha(0.75);
        }

        let thumb = new Thumbnail(this);

        let board = new Board(this);
    }
}