export default class PlayOptions {
  static get ROCK () {return _ROCK}
  static get PAPPER () {return _PAPPER}
  static get SCISSORS () {return _SCISSORS}
  static get values () {return _VALUES}

  constructor (id, winsIds, loosesIds) {
    this.id = id
    this.winsIds = winsIds
    this.loosesIds = loosesIds
    this.texture = PIXI.Texture.fromImage('./assets/' + id + '.png', false)
  }

  wins (other) {
    return this.winsIds.find(i => i == other.id)
  }
  looses (other) {
    return this.loosesIds.find(i => i == other.id)
  }
}

let _ROCK = new PlayOptions('rock', ['scissors'], ['papper'])
let _PAPPER = new PlayOptions('papper', ['rock'], ['scissors'])
let _SCISSORS = new PlayOptions('scissors', ['papper'], ['rock'])
let _VALUES = [_ROCK, _PAPPER, _SCISSORS]
