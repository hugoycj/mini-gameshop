import { Model, DataTypes } from 'sequelize'
import Connection from './connection'

export interface FollowAttributes {
  followingId: number,
  followedId: number
}

interface FollowInstance
  extends Model<FollowAttributes>, FollowAttributes { }

const Follow = Connection().define<FollowInstance>(
  'Follow',
  {
    followingId: {
      field: 'following_id',
      type: DataTypes.INTEGER,
    },
    followedId: {
      field: 'followed_id',
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'follow',
    timestamps: false,
  },
)

Follow.removeAttribute('id')

Follow.sync()

export default () => Follow
