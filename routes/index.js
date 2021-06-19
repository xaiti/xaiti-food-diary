if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
// const cookieParser = require('cookie-parser')

const initializePassport = require('../passport-config')
initializePassport(
    passport,
    async (email) => await User.findOne({email: email}),
    async (id) => await User.findOne({id: id})
    // email => User.find(user => user.email === email),
    // id => User.find(user => user.id === id)
)

// Middleware
router.use(flash())
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))

// Home Page Route
router.get('/', (req, res) => {
    res.render('index')
})

// my-diary Route
router.get('/my-diary', checkAuthenticated, async (req, res) => {
    // console.log(req.user)
    console.log(req.user)
    var userBreakfast = req.user.breakfast ? req.user.breakfast : ''
    res.render('my-diary', {
        username: req.user.name,
        user: req.user,
        breakfast: userBreakfast
    })
})

router.post('/my-diary', async (req, res) => {
    var bodyData = req.body.breakfast ? { breakfast: req.body.breakfast }
                 : req.body.lunch ? { lunch: req.body.lunch }
                 : req.body.dinner ? { dinner: req.body.dinner }
                 : { snack: req.body.snack }
    try {
        await User.updateOne(
        { _id: req.user._id }, 
        {
            $push: bodyData
        })
        res.redirect('/my-diary')
    } catch(err) {
            console.log(err)
        }
})

// All Users Route (temporary)
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

// Sign in Route
router.get('/sign-in', checkNotAuthenticated, (req, res) => {
    res.render('users/sign-in', { user: User() })
})

router.post('/sign-in', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/my-diary',
    failureRedirect: '/sign-in',
    failureFlash: true
}))

// Sign Up Route
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('users/register', { user: new User() })
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        if (await User.findOne({email: req.body.email.toLowerCase()})) {
            const user = new User({})
            let locals = {errorMessage: 'Email already in use'}
            res.render('users/register', {
                title: 'Sign Up',
                user: user,
                locals: locals
            })
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({    
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            const newUser = await user.save()
            // res.redirect(`users/${newUser.id}`)
            res.redirect('/sign-in')
        }
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
    res.redirect('/sign-in')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/sign-in')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/my-diary')
    }
    next()
}

module.exports = router