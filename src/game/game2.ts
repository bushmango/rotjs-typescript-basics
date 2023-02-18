import * as gamepad from '../input/gamepad'
import { createLogger } from '../util/logger'
const logger = createLogger('game2')

export const initGame = () => {
  logger.log('initGame')
  gamepad.initGamepad()
  setInterval(() => {
    mainLoop()
  }, 1000 / 60)
}

const mainLoop = () => {
  // logger.log('mainLoop')
  gamepad.runGamepadInput()
}
