import { Model, DataTypes } from 'sequelize'
import Connection from './connection'

export interface UserAttributes {
  userId: number
  regionId: number
  nickname: string
  avatar: string
  status: string
}

interface UserInstance
  extends Model<UserAttributes>, UserAttributes { }

const User = Connection().define<UserInstance>(
  'User',
  {
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    regionId: {
      field: 'region_id',
      type: DataTypes.INTEGER,
    },
    nickname: {
      field: 'nickname',
      type: DataTypes.STRING(255),
    },
    avatar: {
      field: 'avatar',
      type: DataTypes.STRING(255),
    },
    status: {
      field: 'status',
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: 'user',
    timestamps: false,
  },
)

User.sync()

export default () => User
