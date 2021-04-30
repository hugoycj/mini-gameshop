import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Avatar, Chip } from '@material-ui/core'
import { ArrowBackRounded, ThumbUp, ThumbDown } from '@material-ui/icons'
import { useRouter } from 'next/dist/client/router'
import BorderLinearProgress from './border-linear-progress'
import { GetGameInfo, GetGamePrice } from '../lib/game'
import { defaultUserId } from '../lib/constants'

export interface Comment {
  userNickname: string
  userAvatar: string
  isRecommendation: boolean
  playTime: number
  content: string
}

export interface GameInfoProps {
  gameId: number
  title: string
  releaseDate: Date
  rate: number
  cover: string
  price: string
  comments: Array<Comment>
  categories: Array<string>
  tags: Array<string>
  description: string
}

const GameInfo = ({
  gameId, title, releaseDate, rate, cover, price, comments, categories, tags, description,
}: GameInfoProps) => {
  const router = useRouter()
  return (
    <div className="flex flex-col p-8 space-y-4 divide-y">
      <div className="flex flex-col space-y-4">
        <div
          className="rounded-md flex flex-row items-center space-x-4 group"
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
          <div className="flex-none flex flex-col items-center space-y-2">
            <div className="flex flex-col items-center">
              <div className="text-gray-600 text-base">
                {price.split(':')[1] === '0' ? 'FREE' : price.split(':')[1]}
              </div>
              <div className="text-gray-400 text-sm">
                {price.split(':')[0]}
              </div>
            </div>
            <div
              className="transition-enabled rounded-full shadow-md p-2 px-4 bg-red-400 text-white text-base hover:shadow-xl hover:bg-red-500 cursor-pointer"
              onClick={() => {
                axios.get(
                  '/api/user/buy',
                  { params: { userId: defaultUserId, gameId } },
                )
                router.reload()
              }}
            >
              Purchase
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-2 px-2">
          <div className="text-base text-gray-600">
            Category:
          </div>
          {categories.map((value) => (
            <Chip label={value} />
          ))}
        </div>
        <div className="flex flex-row items-center space-x-2 px-2">
          <div className="text-base text-gray-600">
            Tag:
          </div>
          {tags.map((value) => (
            <Chip label={value} />
          ))}
        </div>
        <div className="p-4 text-gray-600 rounded-md shadow-md bg-gray-100">
          {description}
        </div>
      </div>
      {comments.map((value) => (
        <div className="flex-none pt-4 flex flex-row divide-x space-x-4">
          <div className="flex-none flex flex-row items-center space-x-4">
            <Avatar className="bg-gray-100 shadow-lg" src={`./avatars/${value.userAvatar}`} style={{ height: 56, width: 56 }} />
            <div>
              <div className="w-24 truncate text-base text-gray-800">
                {value.userNickname}
              </div>
            </div>
          </div>
          <div className="flex-grow pl-4 flex flex-col space-y-2">
            <div className="flex flex-row space-x-2 items-center">
              {value.isRecommendation ? (<ThumbUp className="text-green-400" />) : (<ThumbDown className="text-red-400" />)}
              <div className="flex flex-col">
                <div className="text-base text-gray-600">
                  {value.isRecommendation ? 'Recommended' : 'Not Recommended'}
                </div>
                <div className="text-gray-400">
                  {`${value.playTime.toFixed(2)} hours at review time`}
                </div>
              </div>
            </div>
            <div className="text-gray-600">
              {value.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const LoadingAnimation = () => (
  <div />
)

interface GameDetailsProps {
  gameId: number
  closeGameDetails(): void
}

const GameDetails = ({ gameId, closeGameDetails }: GameDetailsProps) => {
  const [gameInfo, setGameInfo] = useState<GameInfoProps | null>(null)

  useEffect(() => {
    const fetchGameInfo = async () => {
      const gameInfo = await GetGameInfo(gameId)
      const price = await GetGamePrice(gameId)
      setGameInfo({
        ...gameInfo,
        price,
      })
    }
    fetchGameInfo()
  }, [])

  return (
    <div className="flex flex-col divide-y">
      <div className="flex flex-row content-start space-x-2 px-4 py-2">
        <button
          className="transition-enabled flex space-x-2 p-2 rounded-full items-center focus:outline-none hover:bg-gray-100"
          type="button"
          onClick={() => closeGameDetails()}
        >
          <div className="transition-enabled text-gray-600">
            <ArrowBackRounded />
          </div>
        </button>
      </div>
      {gameInfo === null ? <LoadingAnimation /> : <GameInfo {...gameInfo} />}
    </div>
  )
}

export default GameDetails
