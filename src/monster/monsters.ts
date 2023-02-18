import * as game2 from '../game/game2'

interface IMonster {
  x: number
  y: number
  char: string
  isPlayer: boolean
}

const monsters: IMonster[] = []

export const create = () => {
  const c: IMonster = {
    x: 0,
    y: 0,
    char: '@',
    isPlayer: true,
  }
  monsters.push(c)
  return c
}

export const getPlayer = () => {
  return monsters.find((c) => c.isPlayer) || null
}

export const drawAll = () => {
  let game = game2.getGame()
  monsters.forEach((c) => {
    game.display.draw(c.x, c.y, c.char, '', '')
  })
}
