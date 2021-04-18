if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')

const initializePassport = require('../passport-config')
initializePassport(
    passport,
    async (email) => await User.findOne({email: email}).exec(),
    async (name) => await User.findOne({name: name}).exec(),
    async (id) => await User.findOne({id: id}).exec()
    // email => User.find(user => user.email === email)
)

router.use(flash())
router.use(session({
    secret: cringe,
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))

router.get('/', (req, res) => {
    res.render('index', { username: req.user.name })
})
router.get('/myDiary', checkAuthenticated, async (req, res) => {
    res.render('myDiary', { username: req.user.name })
})

// All Users Route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const users = await User.find(searchOptions)
        res.render('users/index', {
            users: users,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('users/login', { user: User() })
})

router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/myDiary',
    failureRedirect: '/login',
    failureFlash: true
}))

// New User Route
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('users/register', { user: new User() })
})

// Create User Route
router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({    
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })

        const newUser = await user.save()
        // res.redirect(`users/${newUser.id}`)
        res.redirect('/login')
    } catch(err) {
        const user = new User({})
        let locals = {errorMessage: 'Error creating User'}
        res.render('users/register', {
            user: user,
            locals: locals
        })
        console.log(err)
    }
})

router.delete('/logout', (req, res) => {
    req.logout()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/myDiary')
    }
    next()
}

module.exports = router