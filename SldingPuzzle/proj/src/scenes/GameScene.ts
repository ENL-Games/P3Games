import Phaser from "phaser";
import Thumbnail from "~/obje/Thumbnail";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene' })
    }

    preload() { }

    create() {
        let canvasWidth = this.sys.canvas.width;
        let canvasHeight = this.sys.canvas.height;

        let thumb = new Thumbnail(this);
    }
}