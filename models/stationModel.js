import mongoose from 'mongoose'

const Schema = mongoose.Schema

const stationSchema = new Schema({
  Title: String,
  AddressLine1: String,
  Town: String,
  StateOrProvince: String,
  Postcode: String,
  Location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  Connections: [{ type: Schema.Types.ObjectId, ref: 'Connection' }]
})

export default mongoose.model('Station', stationSchema)