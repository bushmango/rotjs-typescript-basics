import * as game2 from '../game/game2'

export const drawAll = () => {
  let game = game2.getGame()
  let { display } = game
  display.drawText(1, 2, 'This line of text is very long.', 16)
}
