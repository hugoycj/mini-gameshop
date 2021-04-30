import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '../../../lib/back/db/user'
import OwnershipModel from '../../../lib/back/db/ownership'
import { UserCenterUserInfoProps } from '../../../components/user-center'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = parseInt(req.query.userId as string, 10)

  const user = await UserModel().findOne({
    where: { userId },
  })

  const ownerships = await OwnershipModel().findAll({
    where: { userId },
  })

  const playTimeCount = ownerships.map((value) => (value.playHours)).reduce((prev, current) => (prev + current))
  const achievementCount = ownerships.map((value) => (value.achievementCount)).reduce((prev, current) => (prev + current))

  const result = {
    nickname: user!.nickname,
    avatar: user!.avatar,
    gameCount: ownerships.length,
    playTimeCount,
    achievementCount,
  } as UserCenterUserInfoProps

  res.send(result)
}
