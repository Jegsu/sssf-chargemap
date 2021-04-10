import { ApolloServer } from 'apollo-server-express'
import schemas from './schemas/index.js'
import resolvers from './resolvers/index.js'
import express from 'express'
import connectMongo from './db.js'
import helmet from 'helmet'
import cors from 'cors'
import { checkAuth } from './passport/authenticate.js'
import production from './security/production.js'
import localhost from './security/localhost.js'
import 'dotenv/config.js'

(async () => {
    try {
        await connectMongo()

        const server = new ApolloServer({
            typeDefs: schemas,
            resolvers,
            context: async ({ req, res }) => {
                if (req) {
                    const user = await checkAuth(req, res)
                    console.log('app', user)
                    return {
                        req,
                        res,
                        user,
                    }
                }
            },
        })

        const app = express()
        app.use(cors())

        // disable if you want to use graphql playground
        app.use(helmet({
          ieNoOpen: false
        }))

        process.env.NODE_ENV = process.env.NODE_ENV || 'development'

        if (process.env.NODE_ENV === 'production') {
          production(app, 3000)
        } else {
          localhost(app, 8000, 3000)
        }

        server.applyMiddleware({ app })

    } catch (e) {
        console.log('server error: ' + e.message)
    }
})()