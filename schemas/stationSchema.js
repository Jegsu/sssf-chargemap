import { gql } from 'apollo-server-express'

export default gql`
   extend type Query {
    station(id: ID): Station
    stations(start: Int, limit: Int, bounds: Bounds): [Station]
   }

   type Station {
    Title: String
    AddressLine1: String
    Town: String
    StateOrProvince: String
    Postcode: String
    Location: Location
    Connections: [Connection]
   }

   type Location {
    type: String
    coordinates: [Float]
   }

   input Coordinates {
    lng: Float
    lat: Float
   }

   input Bounds {
    _southWest: Coordinates
    _northEast: Coordinates
   }

   input NewLocation {
    coordinates: [Float]
   }
  
   input NewConnection {
    id: ID!
    ConnectionTypeID: String
    CurrentTypeID: String
    LevelID: String
    Quantity: Int
   }

   extend type Mutation {
      addStation(
         Title: String,
         AddressLine1: String,
         Town: String,
         StateOrProvince: String,
         Postcode: String,
         Location: NewLocation,
         Connections: [NewConnection]
      ): Station
      modifyStation(id: ID!Title: String,
         AddressLine1: String,
         Town: String,
         StateOrProvince: String,
         Postcode: String,
         Location: NewLocation,
         Connections: [NewConnection]
      ): Station
      deleteStation(id: ID): Station
   }

`