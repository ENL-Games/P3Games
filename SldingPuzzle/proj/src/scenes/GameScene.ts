import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super({ key: 'GameScene' })
    }

    preload() { }

    create() {
        let canvasWidth = this.sys.canvas.width;
        let canvasHeight = this.sys.canvas.height;

        let txtTitle = this.add.text(canvasWidth / 2, 200, `In Game`);
    }
}