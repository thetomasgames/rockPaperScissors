import PlayOptions from './PlayOptions.js'
import { Observable } from 'rxjs'

// random, predictive(estimates normal distribution), memory(), behaviour
export default class Player extends PIXI.Sprite {
  constructor(x, y, rotation, choice) {
    super(PlayOptions.ROCK.texture, false)
    this.position.set(x, y)
    this.anchor.set(0.5, 0.95)
    this.rotation = rotation
    this.tint = (Math.random() * 0xffffff) << 0 // create specific color for players implementations
    this.choice = choice
    // create player's name text
    this.shakingHand = false
    this.shakingUp = false
    this.shakingProgress = 0
    this.startY = y
    this.startRotation = rotation
  }

  update(delta) {
    if (this.shakingHand) {
      let value = delta * 10
      this.shakingProgress = this.shakingProgress + (this.shakingUp ? value : -value)
      if (this.shakingProgress > 1) {
        this.shakingUp = false
      } else if (this.shakingProgress < -1) {
        this.shakingUp = true
      }
      this.calculateShakeEffects()
    }
  }

  calculateShakeEffects() {
    // this.y = this.startY - this.shakingProgress * 100
    this.rotation = this.startRotation + this.shakingProgress * Math.PI * 0.1
  }

  chooseOption() {
    this.shakingHand = true
    let opt
    if (this.choice) {
      opt = this.choice
    } else {
      opt = PlayOptions.values[Math.round(Math.random() * (PlayOptions.values.length - 1))]
    }
    let obs = Observable.of(this.choice || opt).delay(1000)
    obs.share().subscribe(res => {
      this.render(opt)
      this.shakingHand = false
    })
    return obs
  }

  render(option) {
    // console.log(option.id)
    this.texture = option.texture
  }
}
