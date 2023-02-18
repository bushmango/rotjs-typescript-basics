import { Game } from './game'

import * as game2 from './game/game2'

document.body.onload = () => {
  game2.initGame()
  var game = new Game()
}
