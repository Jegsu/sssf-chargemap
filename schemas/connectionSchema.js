import { gql } from 'apollo-server-express'

export default gql`
   type Connection {
    ConnectionTypeID: ConnectionType
    LevelID: Level
    CurrentTypeID: CurrentType
    Quantity: Int
   }
`
