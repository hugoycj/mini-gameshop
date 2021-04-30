import { Model, DataTypes } from 'sequelize'
import Connection from './connection'

export interface CommentAttributes {
  userId: number
  gameId: number
  recommendationRate: number
  playHours: number
  content: string
}

interface CommentInstance
  extends Model<CommentAttributes>, CommentAttributes { }

const Comment = Connection().define<CommentInstance>(
  'Comment',
  {
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    gameId: {
      field: 'game_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    recommendationRate: {
      field: 'recommendation_rate',
      type: DataTypes.INTEGER,
    },
    playHours: {
      field: 'play_hours',
      type: DataTypes.INTEGER,
    },
    content: {
      field: 'content',
      type: DataTypes.STRING(255),
    },
  },
  {
    tableName: 'comment',
    timestamps: false,
  },
)

Comment.sync()

export default () => Comment
