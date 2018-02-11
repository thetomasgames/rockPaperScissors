import Player from './Player.js';
import { Observable } from 'rxjs';
import PlayOptions from './PlayOptions';

export default class Game {
  statusText;
  players = [];
  gameoptions = [];
  constructor(config) {
    this.app = new PIXI.Application(800, 300, { backgroundColor: 0x1099bb });
    document.body.appendChild(this.app.view);
    this.statusText = new PIXI.Text('Rock Papper Scissors!');
    this.statusText.interactive = true;
    this.statusText.interactive = true;
    this.statusText.buttonMode = true;
    this.statusText.on('pointerdown', () => this.playComputerAgainstComputer());
    this.statusText.position.set(this.app.screen.width / 2, this.app.screen.height * 0.1);
    this.statusText.anchor.set(0.5, 0.5);
    this.app.stage.addChild(this.statusText);
    this.createGameOptions();
  }


  createGameOptions() {
    for (var i = 0; i < PlayOptions.values.length; i++) {
      let obj = new PIXI.Sprite(PlayOptions.values[i].texture, {
        crossOrigin: true
      })
      obj.anchor.set(0.5, 0.5)
      obj.x = (i - PlayOptions.values.length / 2) * 100 + this.app.screen.width / 2;
      obj.y = this.app.screen.height / 2;
      obj.interactive = true;
      obj.buttonMode = true;
      let value = PlayOptions.values[i];
      obj.on('pointerdown', () => this.playHumanAgainstComputer(value));
      this.gameoptions.push(obj);
    }
    this.showGameOptions();
  }

  showGameOptions() {
    this.gameoptions.forEach(o => this.app.stage.addChild(o));
  }

  hideGameOptions() {
    this.gameoptions.forEach(o => this.app.stage.removeChild(o));
  }

  createPlayers(option) {
    if (this.players) {
      this.players.forEach(p => this.app.stage.removeChild(p));
    }
    this.players = [];
    let player1 = new Player(0, this.app.screen.height / 3, 5 / 8 * Math.PI, option);
    this.app.stage.addChild(player1);

    this.app.ticker.add(d => player1.update(0.015));
    let player2 = new Player(this.app.screen.width, this.app.screen.height / 3, 11 / 8 * Math.PI);
    this.app.stage.addChild(player2);
    this.app.ticker.add(d => player2.update(0.015));

    this.players = [player1, player2];
  }

  playComputerAgainstComputer() {
    this.createPlayers();
    this.playWithPlayersSet();
  }

  playHumanAgainstComputer(option) {
    this.createPlayers(option);
    this.playWithPlayersSet();
    //this.hideGameOptions();
    //setTimeout(()=>this.showGameOptions(),2);
  }

  playWithPlayersSet() {
    const obs1 = this.players[0].chooseOption();
    const obs2 = this.players[1].chooseOption();

    Observable.zip(obs1, obs2).subscribe(pair => {
      const opt1 = pair['0'];
      const opt2 = pair['1'];
      let text;
      if (opt1.wins(opt2)) {
        text = 'Player 1 is the winner!';
      } else if (opt1.looses(opt2)) {
        text = 'Player 2 is the winner!';
      } else {
        text = 'We have a draw here!';
      }
      this.statusText.text = text;
    });
  }

}
