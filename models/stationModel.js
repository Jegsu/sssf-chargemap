const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stationSchema = new Schema({
  Title: String,
  AddressLine1: String,
  Town: String,
  StateOrProvince: String,
  Postcode: Number,
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

module.exports = mongoose.model('Station', stationSchema)