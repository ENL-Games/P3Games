import Phaser from 'phaser'
import GameScene from './scenes/GameScene'
import IntroScene from './scenes/IntroScene'
import PreLoader from './scenes/PreLoader'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	backgroundColor: '#4e4e4e',

	scale: {
		mode: Phaser.Scale.FIT,
		width: 1280,
		height: 720,
	},

	// physics: {
	// 	default: 'arcade',
	// 	arcade: {
	// 		gravity: { y: 200 }
	// 	}
	// },
	scene: [ PreLoader,
		IntroScene,
		GameScene,
	]
}

export default new Phaser.Game(config)
