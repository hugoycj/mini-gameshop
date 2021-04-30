import { GameInstance } from './db/game'
import CommentModel from './db/comment'
import { StoreGameProps } from '../../components/store'

export async function GetStoreGameProps(game: GameInstance) {
  const comments = await CommentModel().findAll({
    where: {
      gameId: game.gameId,
    },
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

  return {
    id: game.gameId,
    title: game.title,
    releaseDate: game.releaseDate,
    rate,
    cover: game.coverImage,
    price: 'USD 29.99',
  } as StoreGameProps
}
