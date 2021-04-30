import type { NextApiRequest, NextApiResponse } from 'next'
import DBConnection from '../../../lib/back/db/connection'
import { LibraryGameProps } from '../../../components/library'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = parseInt(req.query.userId as string, 10)
  const games = await DBConnection().query(`CALL playerLibrary(${userId}, '');`)
  res.send(games.map((value: any) => ({
    gameId: value.game_id,
    cover: value.cover_image,
    title: value.name,
    playTime: value.hours,
    totalAchievements: value.total_achievements,
    totalAchievementsMade: value.gained_acievement,
  } as LibraryGameProps)))
}
