import { createLogger } from '../util/logger'
import * as Gamepads from 'gamepads'

// https://www.npmjs.com/package/gamepads

const logger = createLogger('gamepad')

export const initGamepad = () => {
  logger.log('init gamepad')

  // Start polling
  Gamepads.start()

  // Add event listeners
  Gamepads.addEventListener('connect', (e) => {
    logger.log('Gamepad connected')
    logger.log(e.gamepad)
  })

  Gamepads.addEventListener('disconnect', (e) => {
    logger.log('Gamepad disconnected')
    logger.log(e.gamepad)
  })
}

export const runGamepadInput = () => {
  let keys = Object.keys(Gamepads.gamepads)
  keys.forEach((k) => {
    let gamepad = Gamepads.gamepads[k].gamepad
    // logger.log('gamepad', k, gamepad)
    // gamepad.update()
    let b = gamepad.buttons[14]
    if(b.pressed) {
        console.log('pressed 14')
    }
    // logger.log(b)
  })

  //   Gamepads.gamepads.forEach((c) => {
  //     c.update()
  //     let b = c.getButton(14)
  //     logger.log(b)
  //   })
}
