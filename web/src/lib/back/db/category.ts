import { Model, DataTypes } from 'sequelize'
import Connection from './connection'

export interface CategoryAttributes {
  gameId: number
  category: string
}

interface CategoryInstance
  extends Model<CategoryAttributes>, CategoryAttributes { }

const Category = Connection().define<CategoryInstance>(
  'Category',
  {
    gameId: {
      field: 'game_id',
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    category: {
      field: 'category',
      type: DataTypes.STRING(255),
      primaryKey: true,
    },
  },
  {
    tableName: 'category',
    timestamps: false,
  },
)

Category.sync()

export default () => Category
