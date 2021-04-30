import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import { defaultUserId } from '../lib/constants'
import { GetUserCenterUserInfo } from '../lib/user'

export interface UserCenterUserInfoProps {
  nickname: string
  avatar: string
  gameCount: number
  playTimeCount: number
  achievementCount: number
}

const UserCenterUserInfo = ({
  nickname, avatar, gameCount, playTimeCount, achievementCount,
}: UserCenterUserInfoProps) => (
  <div className="bg-white rounded-md shadow-lg flex flex-col items-center space-y-2 px-8 py-4">
    <Avatar className="bg-gray-100 shadow-lg" src={`./avatars/${avatar}`} style={{ height: 56, width: 56 }} />
    <div className="text-base text-gray-800">
      {nickname}
    </div>
    {[[gameCount, 'Games in your library'],
      [playTimeCount, 'Total play time'],
      [achievementCount, 'Total achievements made']]
      .map((value) => (
        <div className="self-start">
          <div>
            <div>
              <div className="text-lg text-gray-800">
                {value[0]}
              </div>
              <div className="text-gray-400">
                {value[1]}
              </div>
            </div>
          </div>
        </div>
      ))}
  </div>
)

const UserCenter = () => {
  const [userInfo, setUserInfo] = useState<UserCenterUserInfoProps | null>(null)

  useEffect(() => {
    const getUserInfo = async () => {
      setUserInfo(await GetUserCenterUserInfo(defaultUserId))
    }
    getUserInfo()
  }, [])

  return (userInfo === null ? null : (<UserCenterUserInfo {...userInfo} />))
}

export default UserCenter
