if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Entry = require('../models/entry')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('../passport-config')
const { rawListeners } = require('../models/user')
initializePassport(
    passport,
    async (email) => await User.findOne({ email: email }),
    async (id) => await User.findOne({ id: id })
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
    res.render('index', {
        user: req.user,
    })
})

// my-diary Route
async function sendDiary(date, req, res) {
    // declare global entry variable
    entry = await Entry.findOne({ user_email: req.user.email, date: date })
    res.render('my-diary', {
        user: req.user,
        entry: entry,
        breakfast: entry ? entry.food.breakfast : [],
        lunch: entry ? entry.food.lunch : [],
        dinner: entry ? entry.food.dinner : [],
        snack: entry ? entry.food.snack : []
    })
}

router.get('/my-diary/:date', checkAuthenticated, async (req, res) => {
    console.log(req.params)
    var dateDate = new Date(req.params.date)
    var date = new Date(dateDate.setUTCHours(0,0,0,0))
    sendDiary(date, req, res)
})

router.get('/my-diary', checkAuthenticated, async (req, res) => {
    const todayDate = new Date()
    var today = new Date(todayDate.setUTCHours(0,0,0,0))
    sendDiary(today, req, res)
})

// query route
// router.get('/my-diary/?:date', checkAuthenticated, async (req, res) => {
//     console.log(req.query.date)
//     // get date from params here
//     sendDiary(date, req, res)
// })

// New Entry
async function newEntry(req, res, location) {
    const newEntry = new Entry({
        user_email: req.user.email,
        date: req.body.date
    })
    newEntry.save()
    res.redirect(307, location)
}

// Update Entry
async function updateEntry(req, method) {
    await Entry.updateOne({ user_email: req.user.email, date: req.body.date }, method)
}

// Push selected food to database
router.post('/my-diary', async (req, res) => {
    if (await Entry.findOne({ user_email: req.user.email, date: req.body.date }) == null) {
        newEntry(req, res, '/my-diary')
    } else {
        updateEntry(req, { $push: { [req.body.meal]: req.body.food_item } })
    }
})


// Remove food item from database
router.post('/remove-food-item', async (req, res) => {
    updateEntry(req, { $pull: { [req.body.meal]: { id: req.body.item_id } } })
})

// Dummy data
router.post('/dummy', async (req, res) => {
    if (entry == null) {
        newEntry(req, res, '/dummy')
    } else {
        updateEntry(req, { $push: { 'food.snack': req.body.snack } })
    }
})

var dummyEntry = async () => {
    const entry = await new Entry({
        user_email: 'q@q',
        date: new Date(),
        food: {
            breakfast: [ {
                id: 'bb',
                item_name : 'breakfast banana',
                brand_name: 'not ripe',
                serving_qty: 1,
                serving_unit: '7"',
                serving_weight: 118,
                cal: 105,
                fat: 0.4,
                sat_fat: 0.1,
                carb: 27,
                protein: 1.3,
                fiber: 3.1,
                sugar: 14.4
            },
            {
                id: 'bb',
                item_name : 'breakfast banana',
                brand_name: 'not ripe',
                serving_qty: 1,
                serving_unit: '7"',
                serving_weight: 118,
                cal: 105,
                fat: 0.4,
                sat_fat: 0.1,
                carb: 27,
                protein: 1.3,
                fiber: 3.1,
                sugar: 14.4
            } ],
            lunch: [ {
                id: 'lb',
                item_name : 'lunch banana',
                brand_name: 'not ripe',
                serving_qty: 1,
                serving_unit: '7"',
                serving_weight: 118,
                cal: 105,
                fat: 0.4,
                sat_fat: 0.1,
                carb: 27,
                protein: 1.3,
                fiber: 3.1,
                sugar: 14.4
            } ],
            dinner: [ {
                id: 'db',
                item_name : 'dinner banana',
                brand_name: 'not ripe',
                serving_qty: 1,
                serving_unit: '7"',
                serving_weight: 118,
                cal: 105,
                fat: 0.4,
                sat_fat: 0.1,
                carb: 27,
                protein: 1.3,
                fiber: 3.1,
                sugar: 14.4
            } ],
            snack: [ {
                id: 'sb',
                item_name : 'snack banana',
                brand_name: 'not ripe',
                serving_qty: 1,
                serving_unit: '7"',
                serving_weight: 118,
                cal: 105,
                fat: 0.4,
                sat_fat: 0.1,
                carb: 27,
                protein: 1.3,
                fiber: 3.1,
                sugar: 14.4
            } ]
        },
        water: 5000,
        exercise: {
            pushups: 25,
            crunches: 50,
            lunges: 50
        }
    })
    entry.save()
}
// dummyEntry()



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

// Sign-out
router.delete('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
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