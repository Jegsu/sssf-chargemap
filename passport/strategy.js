
import passport from 'passport'
import bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'
import passportJWT from 'passport-jwt'
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
import User from '../models/userModel.js'

// need this otherwise error "JwtStrategy requires a secret or key"
// even tho imported in index.js already f.. bs
import 'dotenv/config.js'

passport.use(new Strategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username })

            if (user === null) {
                return done(null, false, { message: 'Incorrect credentials.' })
            }

            const validate = await bcrypt.compare(password, user.password)
            if (!validate) {
                return done(null, false, { message: 'Incorrect credentials.' })
            }

            const strippedUser = user.toObject()
            delete strippedUser.password

            return done(null, strippedUser, { message: 'Logged In Successfully' })
        } catch (e) {
            return done(e)
        }
    }))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
},
    async (jwtPayload, done) => {
        try {
            const user = await User.findOne({ username: jwtPayload.username })

            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (e) {
            return done(e)
        }
    },
))

export default passport