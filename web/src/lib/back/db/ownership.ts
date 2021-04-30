import { Model, DataTypes } from 'sequelize'
import Connection from './connection'

export interface OwnershipAttributes {
  gameId: number
  userId: number
  buyDate: Date
  playHours: number
  achievementCount: number
}

interface OwnershipInstance
  extends Model<OwnershipAttributes>, OwnershipAttributes { }

const Ownership = Connection().define<OwnershipInstance>(
  'Ownership',
  {
    gameId: {
      field: 'game_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    buyDate: {
      field: 'buy_date',
      type: DataTypes.DATE,
    },
    playHours: {
      field: 'play_hours',
      type: DataTypes.INTEGER,
    },
    achievementCount: {
      field: 'achievement_num',
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'ownership',
    timestamps: false,
  },
)

Ownership.sync()

export default () => Ownership
