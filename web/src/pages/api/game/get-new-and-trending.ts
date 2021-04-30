import type { NextApiRequest, NextApiResponse } from 'next'
import GameModel from '../../../lib/back/db/game'
import { GetStoreGameProps } from '../../../lib/back/game'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const games = await GameModel().findAll({
    limit: 64,
    order: [['release_date', 'DESC']],
  })

  const result = await games.map(GetStoreGameProps)

  res.send(await Promise.all(result))
}
