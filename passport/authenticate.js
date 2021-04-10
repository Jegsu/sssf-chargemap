import jwt from 'jsonwebtoken'
import passport from './strategy.js'

export const login = (req, res) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('local', { session: false },
            async (err, user, info) => {
                try {

                    if (err || !user) {
                        reject(info.message)
                    }

                    req.login(user, { session: false }, async (err) => {
                        if (err) {
                            reject(err)
                        }
                        const token = jwt.sign(user, process.env.SECRET)
                        resolve({ user, token })
                    })
                } catch (e) {
                    reject({ message: e.message })
                }
            })(req, res)
    })
}

export const checkAuth = (req, res) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', (err, user) => {
            if (err || !user) {
                resolve(false)
            }
            resolve(user)
        })(req, res)
    })
}
