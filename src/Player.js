import PIXI from 'pixi.js';
import PlayOptions from './PlayOptions.js';
import { Observable } from 'rxjs';

// random, predictive(estimates normal distribution), memory(), behaviour
export default class Player extends PIXI.Sprite {
  constructor(x, y, rotation) {
    super(PlayOptions.values()[0]);
    this.anchor.set(0.5, 0.5);
    this.position.set(x, y);
    this.rotation = rotation;
    this.tint = (Math.random() * 0xffffff) << 0; // create specific color for players implementations
    // create player's name text
  }

  update(delta) {}

  chooseOption() {
    const opt = PlayOptions.values()[
      Math.round(Math.random() * (PlayOptions.values().length - 1))
    ];
    this.render(opt);
    return Observable.of(opt);
  }

  render(option) {
    // console.log(option.id);
    this.texture = option.texture;
  }
}
