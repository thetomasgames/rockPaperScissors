import PIXI from 'pixi.js';
import PlayOptions from './PlayOptions.js';

export default class Player extends PIXI.Sprite {
  constructor(x, y, rotation) {
    super(PIXI.Texture.fromImage('./assets/rock.png'));
    this.anchor.set(0.5, 0.5);
    this.position.set(x, y);
    this.rotation = rotation;
    this.tint = (Math.random() * 0xffffff) << 0;
  }

  update(delta) {}

  chooseOption() {
    const opt = PlayOptions.values()[
      Math.round(Math.random() * (PlayOptions.values().length - 1))
    ];
    this.render(opt);
    return opt;
  }

  render(option) {
    // console.log(option.id);
    this.texture = PIXI.Texture.fromImage('./assets/' + option.id + '.png');
  }
}
