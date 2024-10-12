const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')

// Security npm packages
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const userRouter = require('./routes/userRoutes')
const agenceRouter = require('./routes/agenceRoutes')
const clientRouter = require('./routes/clientRoutes')
const postRouter = require('./routes/postRoutes')
const coursRouter = require('./routes/coursRoutes')

const app = express()

// connect to Db
connectDB()

// GLOGABL MIDDLEWARES

// Set Security HTTP Headers
app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Limit request from same API
const limiter = rateLimit({
  max: 100, // the number of request
  windowMs: 60 * 60 * 1000, // time in milsecond we define an hour
  message: 'Too many request from this IP, please try again in an hour!',
})
app.use('/api', limiter)

//body-parser reading data from req.body with the limit of 100kb
app.use(express.json({ limit: '100kb' }))

// Data sanitization against NoSQL Query injection
app.use(mongoSanitize())

// Data sanatizition against XSS
app.use(xss())

// Prevent parameter polution
// by removing the duplication in queryString
app.use(hpp())

// serving static files
app.use(express.static(`${__dirname}/public`))

// Test middleware
app.use((req, res, next) => {
  //   console.log(req.headers)
  next()
})

// use app middleware
app.use('/api/v1/users', userRouter)
app.use('/api/v1/agences', agenceRouter)
app.use('/api/v1/clients', clientRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/cours', coursRouter)

// Start server
const port = process.env.PORT || 5050
app.listen(port, () => console.log(`Server running on port ${port}`))
