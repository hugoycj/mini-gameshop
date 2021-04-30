import type { NextApiRequest, NextApiResponse } from 'next'
import DBConnection from '../../lib/back/db/connection'
import { Region } from '../index'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const regions = await DBConnection().query('SELECT * FROM region;')
  res.send(regions[0].map((value: any) => ({
    id: value.region_id,
    currency: value.currency,
    flag: value.flag,
  } as Region)))
}
