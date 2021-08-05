const LocalStrategy = require('passport-local').Strategy
const RememberMeStrategy = require('passport-remember-me').Strategy
const utils = require('./utils')
const bcrypt = require('bcrypt')
const User = require('./models/user')
const Token = require('./models/token')

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

    async function consumeRememberMeToken(token, fn) {
      console.log('consume start')
      var doc = await Token.findOne({ token: token })
      var uid = doc ? doc.userID : ''
      // invalidate the single-use token
      await Token.deleteOne({ token: token })
      console.log('consume end')
      return fn(null, uid);
    }

    function saveRememberMeToken(hashedToken, user, fn) {
      console.log('save start')
      new Token({ userID: user.id, userEmail: user.email, token: hashedToken }).save()
      console.log('save end')
      return fn();
    }

    passport.use(new RememberMeStrategy(
      async function(token, done) {
        console.log('RememberMeStrategy:', token)
        consumeRememberMeToken(token, async function(err, uid) {
          if (err) { return done(err); }
          if (!uid) { return done(null, false); }
          
          await User.findById(uid, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            return done(null, user);
          });
        });
      },
      issueToken
    ));

    async function issueToken(user, done) {
      console.log('issue start')
      var token = utils.generateToken(64)
      var hashedToken = await bcrypt.hash(token, 10)
      saveRememberMeToken(hashedToken, user, function(err) {
        if (err) { return done(err); }
        return done(null, token);
      });
      console.log('issue end')
    }
}

module.exports = initialize