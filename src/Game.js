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
    this.statusText = new PIXI.Text('Rock Papper Scissors! (click here to random)');
    this.statusText.interactive = true;
    this.statusText.interactive = true;
    this.statusText.buttonMode = true;
    this.statusText.on('pointerdown', () => this.playComputerAgainstComputer());
    this.statusText.position.set(this.app.screen.width / 2, this.app.screen.height * 0.1);
    this.statusText.anchor.set(0.5, 0.5);
    this.app.stage.addChild(this.statusText);

    this.player1Wins = 0;
    this.player2Wins = 0;
    this.createGameOptions();
  }


  createGameOptions() {
    let size = 100;
    let offset = -(PlayOptions.values.length - 1) * size / 2;
    for (var i = 0; i < PlayOptions.values.length; i++) {
      let obj = new PIXI.Sprite(PlayOptions.values[i].texture, )
      obj.anchor.set(0.5, 0.5)
      obj.x = offset + (i * size) + this.app.screen.width / 2;
      obj.y = this.app.screen.height;
      obj.interactive = true;
      obj.buttonMode = true;
      let value = PlayOptions.values[i];
      obj.on('pointerdown', () => this.playHumanAgainstComputer(value));
      this.gameoptions.push(obj);

    }
    this.targetGameOptionsY = this.app.screen.height;
    this.gameoptions.forEach(opt => this.app.ticker.add(d => {
      if (opt.y != this.targetGameOptionsY) {
        let speed = 20;
        if (opt.y < this.targetGameOptionsY) {
          opt.y += Math.min(speed, this.targetGameOptionsY - opt.y);
        } else {
          opt.y -= Math.min(speed, opt.y - this.targetGameOptionsY);
        }
      }
    }))
    this.gameoptions.forEach(o => this.app.stage.addChild(o));
    this.showGameOptions();
  }

  showGameOptions() {
    this.targetGameOptionsY = this.app.screen.height;
  }

  hideGameOptions() {
    this.targetGameOptionsY = this.app.screen.height * 2;
  }

  createPlayers(option) {
    if (this.players) {
      this.players.forEach(p => this.app.stage.removeChild(p));
    }
    if (!this.player1WinsText) {
      this.player1WinsText = new PIXI.Text('Wins:0');
      this.player1WinsText.position.set(this.app.screen.width * 0.05, this.app.screen.height * 0.05);
      this.player1WinsText.anchor.set(0, 0.5);
      this.app.stage.addChild(this.player1WinsText);
    }

    if (!this.player2WinsText) {
      this.player2WinsText = new PIXI.Text('Wins:0');
      this.player2WinsText.position.set(this.app.screen.width * 0.95, this.app.screen.height * 0.05);
      this.player2WinsText.anchor.set(1, 0.5);
      this.app.stage.addChild(this.player2WinsText);
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

    this.hideGameOptions();
    const obs1 = this.players[0].chooseOption();
    const obs2 = this.players[1].chooseOption();

    Observable.zip(obs1, obs2).subscribe(pair => {
      const opt1 = pair['0'];
      const opt2 = pair['1'];
      let text;
      if (opt1.wins(opt2)) {
        text = 'Player 1 is the winner!';
        this.player1Wins++;
      } else if (opt1.looses(opt2)) {
        text = 'Player 2 is the winner!';
        this.player2Wins++;
      } else {
        text = 'We have a draw here!';
      }
      this.player1WinsText.text = "Wins: " + this.player1Wins.toString();
      this.player2WinsText.text = "Wins: " + this.player2Wins.toString();
      this.statusText.text = text;
      this.showGameOptions();
    });
  }

}
