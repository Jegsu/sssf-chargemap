import ConnectionType from '../models/connectionTypeModel.js'
import Level from '../models/levelModel.js'

export default {
    Query: {
        leveltypes: (parent) => {
            return Level.find({})
        }
    },
    Connection: {
        LevelID: (parent) => {
            return Level.findById(parent.LevelID)
        }
    }
}