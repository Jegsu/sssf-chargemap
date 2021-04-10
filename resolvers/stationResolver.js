import Station from '../models/stationModel.js'
import Connection from '../models/connectionModel.js'
import { rectangleBounds } from '../helpers/rectangleBounds.js'
import { AuthenticationError } from 'apollo-server-express'

export default {
    Query: {
        station: (parent, args) => {
            return Station.findById(args.id)
        },
        stations: async (parent, args) => {
            const { start, limit, bounds } = args

            if (bounds) {
                const bbox = rectangleBounds(bounds._northEast, bounds._southWest)
                return await Station.find({}).where('Location').within(bbox).limit(limit || 10).skip(start)
            } else {
                return await Station.find({}).limit(limit || 10).skip(start)
            }
        }
    },
    Mutation: {
        addStation: async (parent, args, { user }) => {
            const { Connections, ...other } = args

            if (!user) {
                throw new AuthenticationError('You are not authenticated')
            }

            const newConnections = await Connection.insertMany(Connections)
            const connectionIds = newConnections.map(doc => doc._id)

            const newStation = new Station({
                ...other,
                Connections: connectionIds
            })

            return newStation.save()
        },
        modifyStation: async (parent, args, { user }) => {

            const { id, Connections, ...other } = args

            if (!user) {
                throw new AuthenticationError('You are not authenticated')
            }

            if (Connections) {
                Connections.forEach(async doc => {
                    await Connection.findByIdAndUpdate(doc.id, doc, { new: true })
                })
                const connectionIds = Connections.map(doc => doc.id)
                return await Station.findByIdAndUpdate(id, { Connections: connectionIds, ...other }, { new: true })
            } else {
                return await Station.findByIdAndUpdate(id, { ...other }, { new: true })
            }
        },
        deleteStation: async (parent, args, { user }) => {
            const { id } = args

            if (!user) {
                throw new AuthenticationError('You are not authenticated')
            }

            return await Station.findByIdAndDelete(id)
        }
    }
}