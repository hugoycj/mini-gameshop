import React, { useEffect, useState } from 'react'
import { Timer, AssignmentTurnedInOutlined, PlayCircleFilledRounded } from '@material-ui/icons'
import BorderLinearProgress from './border-linear-progress'
import { GetGamesInLibrary } from '../lib/game'
import { defaultUserId } from '../lib/constants'

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

export interface LibraryGameProps {
  gameId: number
  cover: string
  title: string
  playTime: number
  totalAchievements: number
  totalAchievementsMade: number
}

const LibraryGame = ({
  cover, title, playTime, totalAchievements, totalAchievementsMade,
}: LibraryGameProps) => (
  <div className="transition-enabled p-4 rounded-md flex flex-row items-center space-x-4 group hover:bg-gray-100 cursor-pointer">
    <img className="flex-none w-48 rounded-md" src={cover} />
    <div className="flex-none space-y-2">
      <div className="text-base text-gray-800 w-48 truncate">
        {title}
      </div>
      <div className="text-gray-400 flex flex-row items-center space-x-1">
        <Timer />
        <div>
          Play Time:
          <span className="text-gray-600">
            {` ${playTime.toFixed(2)} hours`}
          </span>
        </div>
      </div>
    </div>
    <div className="flex-grow">
      <div className="flex flex-col items-center space-y-2">
        <div className="text-gray-400 flex flex-row items-center space-x-1">
          <AssignmentTurnedInOutlined />
          <div>Achievements</div>
        </div>
        <BorderLinearProgress className="w-48" variant="determinate" value={totalAchievements === 0 ? 0 : 100 * (totalAchievementsMade / totalAchievements)} />
        <div className="text-gray-600">
          {`${totalAchievementsMade} / ${totalAchievements}`}
        </div>
      </div>
    </div>
    <button
      className="transition-enabled flex space-x-2 p-2 pr-3 rounded-full bg-red-100 bg-opacity-60 items-center focus:outline-none hover:bg-red-200"
      type="button"
    >
      <div className="transition-enabled text-red-400 text-opacity-90">
        <PlayCircleFilledRounded fontSize="large" />
      </div>
      <div className="transition-enabled text-lg text-gray-600">
        Launch
      </div>
    </button>
  </div>
)

type LibraryTab = 'Order by Title' | 'Order by Play Time'
const libraryTabs: Array<LibraryTab> = ['Order by Title', 'Order by Play Time']

const Library = () => {
  const [selectedTab, setSelectedTab] = useState<LibraryTab>('Order by Title')
  const [games, setGames] = useState<Array<LibraryGameProps>>([])

  const sortGames = (games: Array<LibraryGameProps>, selectedTab: string) => {
    const compareByTitle = (a: LibraryGameProps, b: LibraryGameProps) => {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    }

    const compareByPlayTime = (a: LibraryGameProps, b: LibraryGameProps) => (b.playTime - a.playTime)

    if (selectedTab === 'Order by Title') {
      const orderByPlayTime = games.sort((a, b) => compareByPlayTime(a, b))
      const orderByTitle = orderByPlayTime.sort((a, b) => compareByTitle(a, b))
      return orderByTitle
    }
    const orderByTitle = games.sort((a, b) => compareByTitle(a, b))
    const orderByPlayTime = orderByTitle.sort((a, b) => compareByPlayTime(a, b))
    return orderByPlayTime
  }

  useEffect(() => {
    const getGames = async () => {
      const games = await GetGamesInLibrary(defaultUserId)
      setGames(sortGames(games, selectedTab))
    }
    getGames()
  }, [])

  return (
    <div className="flex flex-col divide-y">
      <div className="flex flex-row content-start space-x-2 px-4 py-2">
        {libraryTabs.map((value) => (
          <button
            className={`transition-enabled flex space-x-2 p-2 rounded-full items-center focus:outline-none ${value === selectedTab ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
            type="button"
            onClick={() => {
              setGames(sortGames(games, value))
              setSelectedTab(value)
            }}
          >
            <div className={`transition-enabled ${value === selectedTab ? 'text-red-400' : 'text-gray-600'}`}>
              {value}
            </div>
          </button>
        ))}
      </div>
      {games.length === 0 ? (new Array(8)).fill(0).map(() => <LoadingAnimation />)
        : (games.map((value) => (<LibraryGame {...value} />)))}
    </div>
  )
}

export default Library
