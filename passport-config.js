const LocalStrategy = require('passport-local').Strategy;
const RememberMeStrategy = require('passport-remember-me').Strategy;
const utils = require('./utils');
const md5 = require('md5');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Token = require('./models/token');

function initialize(passport, getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: 'Incorrect email or password' });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect email or password' });
            }
        } catch (e) {
            return done(e);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        return done(null, user);
    });

    // remember me functionality
    async function consumeRememberMeToken(token, fn) {
      var doc = await Token.findOne({ token: md5(token) });
      var uid = doc ? doc.userID : '';
      // invalidate the single-use token
      await Token.deleteOne({ token: md5(token) });
      return fn(null, uid);
    }

    function saveRememberMeToken(token, user, fn) {
      new Token({ userID: user.id, userEmail: user.email, token: md5(token) }).save();
      return fn();
    }

    passport.use(new RememberMeStrategy(
      async function(token, done) {
        consumeRememberMeToken(token, async function(err, uid) {
          if (err) {
            console.log(err);
            return done(err);
          }
          if (!uid) { return done(null, false) }
          
          await User.findById(uid, function(err, user) {
            if (err) { return done(err) }
            if (!user) { return done(null, false) }
            return done(null, user);
          });
        });
      },
      issueToken
    ));

    async function issueToken(user, done) {
      var token = utils.generateToken(128);
      saveRememberMeToken(token, user, function(err) {
        if (err) { return done(err) }
        return done(null, token);
      });
    }
}

module.exports = initialize