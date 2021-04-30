import type { NextApiRequest, NextApiResponse } from 'next'
import UserModel from '../../../lib/back/db/user'
import FollowModel from '../../../lib/back/db/follow'
import { FriendProps } from '../../../components/friend-list'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = parseInt(req.query.userId as string, 10)

  const followRelationships = await FollowModel().findAll({
    where: { followingId: userId },
  })

  const followedUsers = await Promise.all(followRelationships.map(async (value) => {
    const user = await UserModel().findOne({ where: { userId: value.followedId } })
    return user
  }))

  const result = followedUsers.map((value) => ({
    nickname: value!.nickname,
    avatar: value!.avatar,
    status: value!.status,
  } as FriendProps))

  res.send(result)
}
