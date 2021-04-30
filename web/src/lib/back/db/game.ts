import { Model, DataTypes } from 'sequelize'
import Connection from './connection'

export interface GameAttributes {
  gameId: number
  title: string
  description: string
  releaseDate: Date
  publisher: string
  developer: string
  totalAchievements: number
  coverImage: string
}

export interface GameInstance
  extends Model<GameAttributes>, GameAttributes { }

const Game = Connection().define<GameInstance>(
  'Game',
  {
    gameId: {
      field: 'game_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      field: 'title',
      type: DataTypes.STRING(4096),
    },
    description: {
      field: 'description',
      type: DataTypes.STRING(4096),
    },
    releaseDate: {
      field: 'release_date',
      type: DataTypes.DATE,
    },
    publisher: {
      field: 'publisher',
      type: DataTypes.STRING(255),
    },
    developer: {
      field: 'developer',
      type: DataTypes.STRING(255),
    },
    totalAchievements: {
      field: 'total_achievements',
      type: DataTypes.INTEGER,
    },
    coverImage: {
      field: 'cover_image',
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: 'game',
    timestamps: false,
  },
)

Game.sync()

export default () => Game
