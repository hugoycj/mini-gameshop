import type { NextApiRequest, NextApiResponse } from 'next'
import DBConnection from '../../../lib/back/db/connection'
import GameModel from '../../../lib/back/db/game'
import CommentModel from '../../../lib/back/db/comment'
import UserModel from '../../../lib/back/db/user'
import CategoryModel from '../../../lib/back/db/category'
import { Comment, GameInfoProps } from '../../../components/game-details'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const gameId = parseInt(req.query.gameId as string, 10)

  const game = await GameModel().findOne({
    where: { gameId },
  })

  const comments = await CommentModel().findAll({
    where: { gameId },
    order: [['play_hours', 'DESC']],
  })

  let rate = 0
  if (comments.length !== 0) {
    rate = (comments.map(
      (value) => value.recommendationRate,
    )
    ).reduce(
      (previousValue, currentValue) => (previousValue + currentValue),
    ) / comments.length
  }

  const commentsWithUserInfo = await Promise.all(comments.map(async (value) => {
    const user = await UserModel().findOne({ where: { userId: value.userId } })
    return {
      userNickname: user!.nickname,
      userAvatar: user!.avatar,
      isRecommendation: value.recommendationRate > 0.5,
      playTime: value.playHours,
      content: value.content,
    } as Comment
  }))

  const categories = await CategoryModel().findAll({ where: { gameId } })
  let finalCategories = categories.map((value) => (value.category))
  if (finalCategories.length > 3) finalCategories = finalCategories.slice(0, 3)

  const tags = (await DBConnection().query(`CALL topTags(${gameId}, 4);`)).map((value: any) => (value.tag))

  const result = {
    gameId,
    title: game!.title,
    releaseDate: game!.releaseDate,
    rate,
    cover: game!.coverImage,
    price: 'USD 29.99',
    comments: commentsWithUserInfo,
    categories: finalCategories,
    tags,
    description: game!.description,
  } as GameInfoProps

  res.send(result)
}
