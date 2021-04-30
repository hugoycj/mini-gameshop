import { Sequelize } from 'sequelize'
import { dbInfo } from '../../constants'

const sequelize = new Sequelize(
  `mysql://${dbInfo.user}:${dbInfo.password}@${dbInfo.host}/${dbInfo.database}`,
  {
    logging: (msg) => console.log(`[sequelize]: ${msg}`),
    timezone: '+08:00',
  },
)

export default () => sequelize
