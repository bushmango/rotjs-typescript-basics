import * as gamepad from '../input/gamepad'
import * as monsters from '../monster/monsters'
import { createLogger } from '../util/logger'
const logger = createLogger('game2')

// import { Display, Scheduler, KEYS, RNG } from 'rot-js/lib/index'
import * as ROT from 'rot-js'

interface IGame {
  display: ROT.Display
}

let _game: IGame | null = null
export const getGame = (): IGame => {
  if (!_game) {
    let display = new ROT.Display({ width: 20, height: 5 })
    document.body.appendChild(display.getContainer())

    // SHOW(display.getContainer())
    display.setOptions({
      width: 30,
      fontSize: 48,
      fontStyle: 'bold',
      bg: '#a00',
    })
    _game = {
      display,
    }
  }
  return _game
}

export const initGame = () => {
  logger.log('initGame')
  getGame()

  monsters.create()

  gamepad.initGamepad()
  setInterval(() => {
    mainLoop()
  }, 1000 / 60)
}

const mainLoop = () => {
  // logger.log('mainLoop')
  gamepad.runGamepadInput()
  let input = gamepad.getInput()
  let player = monsters.getPlayer()
  if (input.left === gamepad.InputState.JustDown) {
    player.x--
  }
  if (input.right === gamepad.InputState.JustDown) {
    player.x++
  }
  if (input.up === gamepad.InputState.JustDown) {
    player.y--
  }
  if (input.down === gamepad.InputState.JustDown) {
    player.y++
  }

  draw()
}

const draw = () => {
  let game = getGame()
  let { display } = game
  display.clear()
  // display.draw(5, 4, '@', '', '')
  display.draw(15, 4, '%', '#0f0', '') /* foreground color */
  display.draw(25, 4, '#', '#f00', '#009') /* and background color */

  monsters.drawAll()
}
