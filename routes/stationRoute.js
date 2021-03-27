const router = require('express').Router()
const station = require('../models/stationModel')
const connection = require('../models/connectionModel')
const connectionType = require('../models/connectionTypeModel')
const level = require('../models/levelModel')
const currentType = require('../models/currentTypeModel')
const { rectangleBounds } = require('../helpers/rectangleBounds')

const connectionsPop = {
  path: 'Connections',
  populate: [
    { path: 'ConnectionTypeID' },
    { path: 'LevelID' },
    { path: 'CurrentTypeID' }
  ]
}

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id

    let query = {}

    query = await station
      .findById(id)
      .populate(connectionsPop)

    res.json(query)
  } catch (e) {
    res.send(e.message)
  }
})

router.get('/', async (req, res) => {
  try {
    const { limit, topRight, bottomLeft } = req.query

    let query = {}

    if (topRight && bottomLeft) {
      const bbox = rectangleBounds(JSON.parse(topRight), JSON.parse(bottomLeft))
      query = await station
        .find({})
        .where('Location')
        .within(bbox)
        .limit(Number(limit) || 10)
        .populate(connectionsPop)
    } else {
      query = await station
        .find({})
        .limit(Number(limit) || 10)
        .populate(connectionsPop)
    }

    res.json(query)
  } catch (e) {
    res.send(e.message)
  }
})

router.post('/', async (req, res) => {
  try {

    const newConnections = await connection.insertMany(req.body.Connections)
    const connectionIds = newConnections.map(doc => doc._id)

    const newStation = new station({
      ...req.body.Station,
      Connections: connectionIds
    })

    await newStation.save()

    const push = await newStation.populate(connectionsPop).execPopulate()

    res.json(push)
  } catch (e) {
    res.send(e.message)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id

    await station.findByIdAndDelete(id)

    res.send(`Deleted station with id ${id}`)
  } catch (e) {
    res.send(e.message)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id

    const updateStation = await station.findByIdAndUpdate(id, req.body.Station, { new: true })

    const updateConnections = req.body.Connections
    
    updateConnections.forEach(async doc => {
      const updated = await connection.findByIdAndUpdate(doc._id, doc)
      return updated._id
    })

    updateStation.Connections = updateConnections

    await updateStation.save()

    const push = await updateStation.populate(connectionsPop).execPopulate()

    res.json(push)
  } catch (e) {
    res.send(e.message)
  }
})

module.exports = router
