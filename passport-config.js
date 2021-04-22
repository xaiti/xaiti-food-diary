const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/user')

function initialize(passport, getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'Incorrect email or password' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
        } else {
            return done(null, false, { message: 'Incorrect email or password' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        return done(null, user);
    })
}

module.exports = initialize