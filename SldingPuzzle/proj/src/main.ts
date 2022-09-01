import Phaser from 'phaser'

import PreLoader from './scenes/PreLoader'
import IntroScene from './scenes/IntroScene'

import GameScene from './scenes/GameScene'
import GameHUD from './scenes/GameHUD'

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
		GameScene, GameHUD
	]
}

export default new Phaser.Game(config)
