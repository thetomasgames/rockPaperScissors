export default class PlayOptions {
  static ROCK = () => new PlayOptions('rock', ['scissors'], ['papper']);
  static PAPPER = () => new PlayOptions('papper', ['rock'], ['scissors']);
  static SCISSORS = () => new PlayOptions('scissors', ['papper'], ['rock']);
  static values = () => [
    PlayOptions.ROCK(),
    PlayOptions.PAPPER(),
    PlayOptions.SCISSORS()
  ];

  constructor(id, winsIds, loosesIds) {
    this.id = id;
    this.winsIds = winsIds;
    this.loosesIds = loosesIds;
  }
  wins(other) {
    return this.winsIds.find(i => i == other.id);
  }
  looses(other) {
    return this.loosesIds.find(i => i == other.id);
  }
  sprite() {
    return '';
  }
}
