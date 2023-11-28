import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoutes from '../routes/users.js'


const app=express()
app.use (morgan('dev'))

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))

app.use(userRoutes)

dotenv.config({path:'./config.env'})


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log('se conecto a la base')
})
.catch(error => {
    console.log('Error al conectar a la base de datos:')
})

export default app