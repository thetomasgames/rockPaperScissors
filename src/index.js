import plugins from './plugins';
import config from './config';
import Game from './Game';
let game = new Game(config);

game.start();
