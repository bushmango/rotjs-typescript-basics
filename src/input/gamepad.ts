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

export enum InputState {
  JustUp = 0,
  JustDown = 1,
  StaleUp = 2,
  StaleDown = 3,
}
interface IInput {
  left: InputState
  right: InputState
  up: InputState
  down: InputState
}
let _input: IInput | null = null
export const getInput = () => {
  if (!_input) {
    _input = {
      left: InputState.StaleUp,
      right: InputState.StaleUp,
      up: InputState.StaleUp,
      down: InputState.StaleUp,
    }
  }
  return _input
}

export const runGamepadInput = () => {
  let keys = Object.keys(Gamepads.gamepads)
  keys.forEach((k) => {
    let gamepad = Gamepads.gamepads[k].gamepad
    // logger.log('gamepad', k, gamepad)
    // gamepad.update()
    let b = gamepad.buttons[14]
    let input = getInput()

    const updateKey = (state: InputState, isPressed: boolean, name: string) => {
      if (isPressed) {
        if (state !== InputState.JustDown && state !== InputState.StaleDown) {
          logger.log('pressed', name)
          return InputState.JustDown
        }
        return InputState.StaleDown
      } else {
        if (state !== InputState.JustUp && state !== InputState.StaleUp) {
          return InputState.JustUp
        }
        return InputState.StaleUp
      }
    }

    input.left = updateKey(input.left, gamepad.buttons[14].pressed, 'left')
    input.right = updateKey(input.right, gamepad.buttons[15].pressed, 'right')
    input.down = updateKey(input.down, gamepad.buttons[13].pressed, 'down')
    input.up = updateKey(input.up, gamepad.buttons[12].pressed, 'up')

    // if (b.pressed) {
    //   // console.log('pressed 14')
    // }
    // logger.log(b)
  })

  //   Gamepads.gamepads.forEach((c) => {
  //     c.update()
  //     let b = c.getButton(14)
  //     logger.log(b)
  //   })
}
