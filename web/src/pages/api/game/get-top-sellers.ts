import type { NextApiRequest, NextApiResponse } from 'next'
import DBConnection from '../../../lib/back/db/connection'
import GameModel, { GameInstance } from '../../../lib/back/db/game'
import { GetStoreGameProps } from '../../../lib/back/game'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const gameIds = await DBConnection().query('CALL topSold(0);')

  const games = await Promise.all(gameIds.slice(0, 64).map(async (value: any) => {
    const game = await GameModel().findOne({ where: { gameId: value.game_id } })
    return game
  }))

  const result = await games.map((value) => (GetStoreGameProps(value!)))

  res.send(await Promise.all(result))
}
