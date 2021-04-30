import axios from 'axios'
import Cookies from 'js-cookie'
import { StoreGameProps } from '../components/store'
import { LibraryGameProps } from '../components/library'
import { GameInfoProps } from '../components/game-details'

export async function GetRecommendations() {
  return []

  /*
  const res = await axios.get<Array<StoreGameProps>>(
    '/api/game/get-recommendations',
  )
  return res.data
  */
}

export async function GetNewAndTrending() {
  const res = await axios.get<Array<StoreGameProps>>(
    '/api/game/get-new-and-trending',
  )
  return res.data
}

export async function GetTopSellers() {
  const res = await axios.get<Array<StoreGameProps>>(
    '/api/game/get-top-sellers',
  )
  return res.data
}

export async function GetGamesInLibrary(userId: number) {
  const res = await axios.get<Array<LibraryGameProps>>(
    '/api/game/get-games-in-library',
    { params: { userId } },
  )
  return res.data
}

export async function GetGameInfo(gameId: number) {
  const res = await axios.get<GameInfoProps>(
    '/api/game/get-game-info',
    { params: { gameId } },
  )
  return res.data
}

export async function GetGamePrice(gameId: number) {
  let regionId = 38
  if (Cookies.get('region') !== undefined) regionId = parseInt(Cookies.get('region') as string, 10)

  const res = await axios.get<string>(
    '/api/game/get-price',
    { params: { gameId, regionId } },
  )
  return res.data
}
