import Phaser from 'phaser'

import PreLoader from './scenes/PreLoader'
import GameScene from './scenes/GameScene'
import GameHUD from './scenes/GameHUD'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	backgroundColor: '#4e4e4e',

	scale: {
		mode: Phaser.Scale.FIT,
		width: 1600,
		height: 1000,
	},

	// physics: {
	// 	default: 'arcade',
	// 	arcade: {
	// 		gravity: { y: 200 }
	// 	}
	// },
	scene: [PreLoader, GameScene, GameHUD],
}

export default new Phaser.Game(config)
