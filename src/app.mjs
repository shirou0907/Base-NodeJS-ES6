import './loadEnv.mjs'
import createError from 'http-errors'
import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { useRoute } from './routes/index.mjs'
import connectDB from './config/index.mjs'
import cors from 'cors'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(__dirname + '/public'))

app.use(
  cors({
    origin: true,
    credentials: true,
  })
)

app.use('/ac', (req, res, next) => {
  res.json(`dir, ${__dirname}`)
})



connectDB()
useRoute(app)

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404))
// })

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app
