import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import { GetFriends } from '../lib/user'
import { defaultUserId } from '../lib/constants'

export interface FriendProps {
  nickname: string
  avatar: string
  status: string
}

const Friend = ({ nickname, avatar, status }: FriendProps) => (
  <div className="flex flex-row items-center space-x-4">
    <Avatar className="shadow-lg" src={`./avatars/${avatar}`} style={{ height: 56, width: 56 }} />
    <div>
      <div className="w-32 truncate text-lg text-gray-800">
        {nickname}
      </div>
      <div className={`w-36 truncate ${status === 'online'
        ? 'text-green-500'
        : (status.startsWith('offline')
          ? 'text-gray-400'
          : 'text-red-400'
        )}`}
      >
        {status === 'online' ? 'Online' : 'Offline'}
      </div>
    </div>
  </div>
)

const FriendList = () => {
  const [friends, setFriends] = useState<Array<FriendProps>>([])

  useEffect(() => {
    const getFriends = async () => {
      setFriends(await GetFriends(defaultUserId))
    }
    getFriends()
  }, [])

  return (
    <div className="bg-white rounded-md shadow-lg flex flex-col px-8 py-4 space-y-4 items-start">
      <div className="text-lg text-gray-600">
        Your Friends
      </div>
      {friends.map((value) => (
        <Friend {...value} />
      ))}
    </div>
  )
}

export default FriendList
