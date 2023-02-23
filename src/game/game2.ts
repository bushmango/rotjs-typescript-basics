import * as gamepad from '../input/gamepad'
import * as monsters from '../monster/monsters'
import * as mainUi from '../ui/mainUi'
import { createLogger } from '../util/logger'
const logger = createLogger('game2')

// import { Display, Scheduler, KEYS, RNG } from 'rot-js/lib/index'
import * as ROT from 'rot-js'
import Digger from 'rot-js/lib/map/digger'

interface IGame {
  display: ROT.Display
  map: Digger
}

let _game: IGame | null = null
export const getGame = (): IGame => {
  if (!_game) {
    let display = new ROT.Display({ width: 20, height: 5 })
    document.body.appendChild(display.getContainer())

    // SHOW(display.getContainer())

    display.setOptions({
      width: 40,
      height: 20,
      fontSize: 48,
      fontStyle: 'bold',
      bg: '#666',
    })

    ROT.RNG.setSeed(1234)
    var map = new ROT.Map.Digger(40, 20, {})
    map.create(() => {
      console.log('map generator finished')
    })

    _game = {
      display,
      map,
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
  let { display, map } = game
  display.clear()
  // display.draw(5, 4, '@', '', '')
  // display.draw(15, 4, '%', '#0f0', '') /* foreground color */
  // display.draw(25, 4, '#', '#f00', '#009') /* and background color */

  //mainUi.drawAll()

  // display.DEBUG()

  // Draw map

  var drawDoor = (x, y) => {
    display.draw(x, y, '+', '', 'red')
  }
  let rooms = map.getRooms()

  for (var roomIdx = 0; roomIdx < rooms.length; roomIdx++) {
    var room = rooms[roomIdx]

    let l = room.getLeft()
    let r = room.getRight()
    let t = room.getTop()
    let b = room.getBottom()

    for (let i = l; i <= r; i++) {
      for (let j = t; j <= b; j++) {
        display.draw(i, j, '', '', 'blue')
      }
    }

    for (let i = l - 1; i < r + 1; i++) {
      display.draw(i, t - 1, '-', '', 'yellow')
      display.draw(i, b + 1, '-', '', 'yellow')
    }

    for (let j = t - 1; j < b + 1; j++) {
      display.draw(l - 1, j, '|', '', 'yellow')
      display.draw(r + 1, j, '|', '', 'yellow')
    }

    display.draw(l - 1, t - 1, 'A', '', 'yellow')
    display.draw(r + 1, t - 1, 'B', '', 'yellow')
    display.draw(r + 1, b + 1, 'C', '', 'yellow')
    display.draw(l - 1, b + 1, 'D', '', 'yellow')

    room.getDoors(drawDoor)
  }

  let corridors = map.getCorridors()
  for (let corridorIdx = 0; corridorIdx < corridors.length; corridorIdx++) {
    let c = corridors[corridorIdx]

    let sx = c._startX
    let sy = c._startY
    let ex = c._endX
    let ey = c._endY
    if (sx > ex) {
      let swap = ex
      ex = sx
      sx = swap
    }
    if (sy > ey) {
      let swap = ey
      ey = sy
      sy = swap
    }

    // console.log('corridor', corridorIdx, c, sx, sy)

    for (let i = sx; i <= ex; i++) {
      for (let j = sy; j <= ey; j++) {
        // console.log('draw', i, j)
        display.draw(i, j, 'x', '', 'green')
      }
    }
  }

  monsters.drawAll()
}
