import axios from 'axios'
import { UserCenterUserInfoProps } from '../components/user-center'
import { FriendProps } from '../components/friend-list'

export async function GetUserCenterUserInfo(userId: number) {
  const res = await axios.get<UserCenterUserInfoProps>(
    '/api/user/get-user-info',
    { params: { userId } },
  )
  return res.data
}

export async function GetFriends(userId: number) {
  const res = await axios.get<Array<FriendProps>>(
    '/api/user/get-friends',
    { params: { userId } },
  )
  return res.data
}
