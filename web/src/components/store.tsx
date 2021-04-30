import React, { useEffect, useState } from 'react'
import {
  ThumbUp, ThumbDown,
} from '@material-ui/icons'
import BorderLinearProgress from './border-linear-progress'
import {
  GetRecommendations, GetNewAndTrending, GetTopSellers, GetGamePrice,
} from '../lib/game'
import { OpenGameDetails } from '../pages/index'

const LoadingAnimation = () => (
  <div
    className="animate-pulse p-4 rounded-md flex flex-row items-center space-x-4"
  >
    <div className="flex-none w-48 h-24 rounded-md bg-red-100" />
    <div className="flex-none space-y-2">
      <div className="w-48 h-4 rounded-md bg-red-100" />
      <div className="w-32 h-4 rounded-md bg-red-100" />
    </div>
    <div className="flex-grow">
      <div className="h-6 rounded-md bg-red-100" />
    </div>
    <div className="flex-none w-24 h-4 rounded-md bg-red-100" />
  </div>
)

export interface StoreGameProps {
  id: number
  title: string
  releaseDate: Date
  rate: number
  cover: string
  price: string
  openGameDetails?: OpenGameDetails
}

const StoreGame = ({
  id, title, releaseDate, rate, cover, price, openGameDetails,
}: StoreGameProps) => (
  <div
    className="transition-enabled p-4 rounded-md flex flex-row items-center space-x-4 group hover:bg-gray-100 cursor-pointer"
    onClick={() => openGameDetails!(id)}
  >
    <img className="flex-none w-48 rounded-md" src={cover} />
    <div className="flex-none">
      <div className="text-base text-gray-800 w-48 truncate">
        {title}
      </div>
      <div className="text-gray-400">
        {(new Date(releaseDate)).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric',
        })}
      </div>
    </div>
    <div className="flex-grow">
      <div className="flex flex-row justify-center items-center space-x-2">
        <ThumbDown className="text-gray-400" />
        <BorderLinearProgress className="w-32" variant="determinate" value={rate * 100 * 0.9 + 10} />
        <ThumbUp className="text-gray-400" />
      </div>
    </div>
    <div className="flex-none flex flex-col items-end">
      <div className="text-gray-600 text-base">
        {price.split(':')[1] === '0' ? 'FREE' : price.split(':')[1]}
      </div>
      <div className="text-gray-400 text-sm">
        {price.split(':')[0]}
      </div>
    </div>
  </div>
)

type StoreTab = 'Recommendations' | 'New and Trending' | 'Top Sellers'
const storeTabs: Array<StoreTab> = ['New and Trending', 'Top Sellers']
// const storeTabs: Array<StoreTab> = ['Recommendations', 'New and Trending', 'Top Sellers']

const Store = ({ openGameDetails }: { openGameDetails: OpenGameDetails }) => {
  const [selectedTab, setSelectedTab] = useState<StoreTab>('New and Trending')
  const [games, setGames] = useState<Array<StoreGameProps>>([])

  useEffect(() => {
    const getGames = async () => {
      // Clear
      setGames([])

      let newGames: Array<StoreGameProps> = []
      if (selectedTab === 'Recommendations') {
        newGames = await GetRecommendations()
      } else if (selectedTab === 'New and Trending') {
        newGames = await GetNewAndTrending()
      } else {
        newGames = await GetTopSellers()
      }

      const newGamesWithPrice = await Promise.all(newGames.map(async (value) => {
        const price = await GetGamePrice(value.id)
        return {
          ...value,
          price,
        } as StoreGameProps
      }))

      setGames(newGamesWithPrice)
    }
    getGames()
  }, [selectedTab])

  return (
    <div className="flex flex-col divide-y">
      <div className="flex flex-row content-start space-x-2 px-4 py-2">
        {storeTabs.map((value) => (
          <button
            className={`transition-enabled flex space-x-2 p-2 rounded-full items-center focus:outline-none ${value === selectedTab ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            type="button"
            onClick={() => { setSelectedTab(value) }}
          >
            <div className={`transition-enabled ${value === selectedTab ? 'text-red-400' : 'text-gray-600'}`}>
              {value}
            </div>
          </button>
        ))}
      </div>
      {games.length === 0 ? (new Array(8)).fill(0).map(() => (<LoadingAnimation />))
        : (games.map((value) => (<StoreGame {...value} openGameDetails={openGameDetails} />)))}
    </div>
  )
}

export default Store
