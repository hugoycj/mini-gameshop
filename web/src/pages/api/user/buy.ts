import type { NextApiRequest, NextApiResponse } from 'next'
import OwnershipModel from '../../../lib/back/db/ownership'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = parseInt(req.query.userId as string, 10)
  const gameId = parseInt(req.query.gameId as string, 10)

  await OwnershipModel().create({
    gameId,
    userId,
    buyDate: new Date(),
    playHours: 0,
    achievementCount: 0,
  })

  res.end()
}
