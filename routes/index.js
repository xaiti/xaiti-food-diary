if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Entry = require('../models/entry')
const Token = require('../models/token')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const axios = require('axios').default
const utils = require('../utils')
const md5 = require('md5')
const nodemailer = require('nodemailer')

const initializePassport = require('../passport-config')
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
router.use(passport.authenticate('remember-me'))
router.use(methodOverride('_method'))

// Nutritionix API
router.post('/nutritionix-api', (req, res) => {
    const x_app_id = '246713f5'
    const x_app_key = '6328f24ae2491f74e8af49fbbc09bc64'
    const test_app_id = '811d2511'
    const test_app_key = 'b1a59fcada36e48c63c6cbfbc5f7dca8'
    axios.post('https://api.nutritionix.com/v1_1/search', {
        'appId': x_app_id,
        'appKey': x_app_key,
        'query': req.body.query,
        'offset': 0,
        'limit': 20,
        'fields': [
            'item_name',
            'brand_name',
            'nf_serving_size_qty',
            'nf_serving_size_unit',
            'nf_serving_weight_grams',
            'metric_qty',
            'metric_uom',
            'nf_calories',
            'nf_total_fat',
            'nf_saturated_fat',
            'nf_total_carbohydrate',
            'nf_protein',
            'nf_dietary_fiber',
            'nf_sugars'
        ]
    })
    .then(function (response) {
        res.send(response.data)
    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(() => {
        res.end()
    })
})

// Home Page Route
router.get('/', (req, res) => {
    res.render('main/home', {
        title: 'X Food Diary',
        css: 'home-page',
        user: req.user,
    })
})

// Help Route
router.get('/help', (req, res) => {
    res.render('main/help', {
        title: 'Help',
        css: 'help',
        user: req.user,
    })
})

// How It Works Route
router.get('/how-it-works', (req, res) => {
    res.render('main/how-it-works', {
        title: 'How It Works',
        css: 'how-it-works',
        user: req.user,
    })
})

// My Diary Route
async function sendDiary(date, req, res) {
    // declare global entry variable
    ENTRY = await Entry.findOne({ user_email: req.user.email, date: date })
    res.render('main/my-diary', {
        title: 'My Diary',
        css: 'my-diary',
        user: req.user,
        entry: ENTRY,
        breakfast: ENTRY ? ENTRY.food.breakfast : [],
        lunch: ENTRY ? ENTRY.food.lunch : [],
        dinner: ENTRY ? ENTRY.food.dinner : [],
        snack: ENTRY ? ENTRY.food.snack : [],
        water: ENTRY && ENTRY.water || 0
    })
}

router.get('/my-diary/:date', checkAuthenticated, async (req, res) => {
    const dateDate = new Date(req.params.date)
    const date = new Date(dateDate.setUTCHours(0,0,0,0))
    sendDiary(date, req, res)
})

router.get('/my-diary', checkAuthenticated, async (req, res) => {
    const todayDate = new Date()
    const today = new Date(todayDate.setUTCHours(0,0,0,0))
    sendDiary(today, req, res)
})

// query route
// router.get('/my-diary/?:date', checkAuthenticated, async (req, res) => {
//     console.log(req.query.date)
//     // get date from params here
//     sendDiary(date, req, res)
// })

// New Entry
async function newEntry(req) {
    const newEntry = new Entry({
        user_email: req.user.email,
        date: req.body.date
    })
    await newEntry.save()
}

// Update Entry
async function updateEntry(req, method) {
    await Entry.updateOne({ user_email: req.user.email, date: req.body.date }, method)
}

// Push selected food to database
router.post('/my-diary', async (req, res) => {
    if (ENTRY == null) {
        await newEntry(req)
    }
    updateEntry(req, { $push: { [req.body.meal]: req.body.food_item } })
})

// Remove food item from database
router.post('/remove-food-item', async (req, res) => {
    updateEntry(req, { $pull: { [req.body.meal]: { id: req.body.item_id } } })
})

// Push water to database
router.post('/add-water', async (req, res) => {
    if (ENTRY == null) {
        await newEntry(req)
    }
    updateEntry(req, { $inc: { water: req.body.water } })
})

// Dummy data
router.post('/dummy', async (req, res) => {
    if (ENTRY == null) {
        await newEntry(req)
    }
    updateEntry(req, { $push: { 'food.snack': req.body.snack } })
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
router.get('/users', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const users = await User.find(searchOptions)
        res.render('users/index', {
            title: 'Users',
            css: '',
            user: req.user,
            users: users,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

// Sign in Route
router.get('/sign-in', checkNotAuthenticated, (req, res) => {
    res.render('users/sign-in', { title: 'Sign In', css: 'sign-in', user: User() })
})

router.post('/sign-in', checkNotAuthenticated, function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) { return res.render('users/sign-in', {
            title: 'Sign In',
            css: 'sign-in',
            user: new User(),
            locals: { forgotMessage: true }
        }) }
        req.logIn(user, function(err) {
            if (err) { return next(err) }
            return next()
        })
    })(req, res, next) },
    async (req, res, next) => {
        // issue a remember me cookie if the option was checked
        if (!req.body.remember_me) { return next(); }

        var token = utils.generateToken(128)
        new Token({ userID: req.user.id, userEmail: req.user.email, token: md5(token) }).save(function(err) {
            if (err) { return done(err) }
            res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 86400000 * 30 });
            return next()
        });
    },
    (req, res) => {
        res.redirect('/my-diary')
    }
)

// Password reset route
router.get('/forgot', checkNotAuthenticated, (req, res) => {
    res.render('users/forgot', {
        title: 'Password Reset',
        css: 'sign-in',
        user: User(),
        // locals: { errorMessage: 'Incorrect email or password' }
    })
})

// Sign Up Route
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('users/register', { title: 'Sign Up', css: 'sign-in', user: new User() })
})

router.post('/register', checkNotAuthenticated, async (req, res) => {
    function renderResgister(errMsg) {
        res.render('users/register', {
            title: 'Sign Up',
            css: 'sign-in',
            user: new User(),
            locals: { errorMessage: errMsg }
        })
    }
    try {
        if (await User.findOne({ email: req.body.email.toLowerCase() })) {
            renderResgister('Email already in use')
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            // const newUser = await user.save()
            // res.redirect(`users/${newUser.id}`)
            user.save(function(err) {
                req.logIn(user, function(err) {
                    res.redirect('/my-diary');
                })
            })
        }
    } catch(err) {
        renderResgister('Error creating User')
        console.log(err)
    }
})

// Sign-out
router.delete('/sign-out', async (req, res) => {
    await Token.deleteOne({ userID: req.user.id })
    res.clearCookie('remember_me')
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