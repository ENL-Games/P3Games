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

        let bg = this.add.image(canvasWidth / 2, canvasHeight / 2, `bg-game`);
        {
            let box = this.add.rectangle(canvasWidth / 2, canvasHeight / 2
                , canvasWidth, canvasHeight
                , 0x000000);
            box.setAlpha(0.75);
            // bg.setBlendMode(Phaser.BlendModes.DIFFERENCE);
            
            // bg.setCrop(0, 0, 300, 300);
            // bg.setSize(300, 300);
            // bg.setPosition(0, 0);
            // console.log(bg.x, bg.y);
        }

        let thumb = new Thumbnail(this);

        let board = new Board(this);
    }
}