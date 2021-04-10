import { AuthenticationError } from 'apollo-server-express'
import { login } from '../passport/authenticate.js'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'

export default {
    Query: {
        login: async (parent, args, { req, res }) => {
            req.body = args
            try {
                const authResponse = await login(req, res)

                return {
                    id: authResponse.user.id,
                    username: authResponse.user.username,
                    token: authResponse.token,
                }
            } catch (e) {
                throw new AuthenticationError(e.message)
            }
        }
    },
    Mutation: {
        register: async (parent, args) => {
            try {
                const { username, password } = args
                const hash = await bcrypt.hash(password, 12)
                const newUser = new User({ username, password: hash })
                return await newUser.save()
            } catch (e) {
                throw new Error(e)
            }
        }
    }
}