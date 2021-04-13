import { gql } from 'apollo-server-express'
import levelSchema from './levelSchema.js'
import currentTypeSchema from './currentTypeSchema.js'
import connectionTypeSchema from './connectionTypeSchema.js'
import connectionSchema from './connectionSchema.js'
import stationSchema from './stationSchema.js'

const linkSchema = gql`
   type Query {
     _: Boolean
   }
   type Mutation {
     _: Boolean
   }
`

export default [
  linkSchema,
  connectionSchema,
  connectionTypeSchema,
  currentTypeSchema,
  levelSchema,
  stationSchema,
]