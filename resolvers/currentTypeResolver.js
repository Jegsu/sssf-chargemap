import CurrentType from '../models/currentTypeModel.js'

export default {
    Query: {
        currenttypes: (parent) => {
            return CurrentType.find({})
        }
    },
    Connection: {
        CurrentTypeID: (parent) => {
            return CurrentType.findById(parent.CurrentTypeID)
        }
    }
}