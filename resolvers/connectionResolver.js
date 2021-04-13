import Connection from '../models/connectionModel.js'

export default {
    Station: {
        Connections: (parent) => {
            return parent.Connections.map(id => Connection.findById(id))
        }
    }
}