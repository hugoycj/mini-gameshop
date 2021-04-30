import type { NextApiRequest, NextApiResponse } from 'next'
import DBConnection from '../../../lib/back/db/connection'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { gameId, regionId } = req.query
  const regionName = ((await DBConnection().query(
    `SELECT currency FROM region WHERE region_id=${regionId};`,
  )) as any)[0][0].currency as string
  const price = ((await DBConnection().query(
    `SELECT price FROM price WHERE game_id=${gameId} AND region_id=${regionId}`,
  )) as any)[0][0].price as string

  res.send(`${regionName.trim()}:${price}`)
}
