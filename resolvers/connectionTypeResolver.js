import ConnectionType from '../models/connectionTypeModel.js'

export default {
    Query: {
        connectiontypes: (parent) => {
            return ConnectionType.find({})
        }
    },
    Connection: {
        ConnectionTypeID: (parent) => {
            return ConnectionType.findById(parent.ConnectionTypeID)
        }
    }
}