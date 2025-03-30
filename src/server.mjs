import express from 'express'
import router from './routes/index.mjs'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import './strategy/local-strategy.mjs'
import MongoStore from 'connect-mongo'



const app = express()
mongoose.connect("mongodb://localhost/TaskManger").then(()=> console.log("db connected")).catch((err)=> console.log(err))

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret : "nvoaljaif0420j234hj23423ho",
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : 6000*60
    },
    store : MongoStore.create({
        client : mongoose.connection.getClient()
    })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(router)


app.listen(PORT,()=>{
    console.log("Server running at http://localhost:3000")
})