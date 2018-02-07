import Player from './Player.js';
import { Observable } from 'rxjs';
import PlayOptions from './PlayOptions';

export default class Game {
  statusText;
  players = [];
  constructor(config) {
    this.app = new PIXI.Application(800,300,{backgroundColor: 0x1099bb});
    document.body.appendChild(this.app.view);
    this.statusText = new PIXI.Text('Rock Papper Scissors!');
    this.statusText.interactive = true;
    this.statusText.interactive = true;
    this.statusText.buttonMode = true;
    this.statusText.on('pointerdown',()=>this.playOnce());
    this.statusText.position.set(this.app.screen.width / 2, this.app.screen.height * 0.1);
    this.statusText.anchor.set(0.5, 0.5);
    this.app.stage.addChild(this.statusText);
    this.createGameOptions();
    this.start();
  }

  
  createGameOptions(){
    let optionTextures = [PlayOptions.ROCK.texture,PlayOptions.PAPPER.texture,PlayOptions.SCISSORS.texture]
    this.gameoptions=[];
    for(var i=0;i<optionTextures.length;i++){
      let obj = new PIXI.Sprite(optionTextures[i])
      obj.x+=i*50;
      
      obj.interactive = true;
      obj.buttonMode = true;
      obj.on('pointerdown',this.test);
      this.gameoptions.push(obj);
    }
    
    this.gameoptions.forEach(o=>this.app.stage.addChild(o));
  }

  test(){
    console.log('test');
  }

  update() {
    for (let i = 0; i < this.app.stage.children.length; i++) {
      if (this.app.stage.children[i].update) {
    //    this.app.stage.children[i].update(this.animationLoop.delta);
      }
    }
  }

  start() {
    let player1 = new Player(0, this.app.screen.height / 3, 5/8*Math.PI,PlayOptions.PAPPER);
    this.app.stage.addChild(player1);
    
    this.app.ticker.add(d=>player1.update(0.01));
    let player2 = new Player(this.app.screen.width, this.app.screen.height / 3, 11/8*Math.PI);
    this.app.stage.addChild(player2);
    this.app.ticker.add(d=>player2.update(0.01));

    this.players = [player1, player2];

    //this.animationLoop.start();
    
    // end game and create player options
  }


  playOnce() {
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

  stop() {
    this.animationLoop.stop();
  }

}
