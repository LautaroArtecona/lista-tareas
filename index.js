import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'



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


const itemSchema={
    nombre:String
}

const Item=mongoose.model('Item',itemSchema)

const item1= new Item({nombre:'texto de ejemplo 1'})
const item2= new Item({nombre:'texto de ejemplo 2'})
const item3= new Item({nombre:'texto de ejemplo 3'})

const defaultItems=[item1,item2,item3]


/* esto debe estar en (en la clase que se ve el ejemplo de artistas dice como ordenar el codigo)

Item.insertMany(defaultItems)
    .then(()=>{
        console.log('se insertaron de forma correcta en la BD')
    })
    .catch(error=>{
        console.log('error al insertar los items')
    }) 
*/

//rutas

app.get('/',(req,res)=>{
    Item.find({})
    .then(function(foundItems){
        if(foundItems===0){
            Item.insertMany(defaultItems)
            console.log('se insertaron de forma correcta en la BD')
        }else{
            console.log(foundItems)
        res.render('pages/list',{listTitle:'hoy', newListItems:foundItems})
        }
    })
})

app.post('/',(req,res)=>{
    const itemNombre=req.body.newTodo
    const item=new Item({
        nombre:itemNombre
    })
    item.save()
    res.redirect('/')
})

app.post('/delete',(req,res)=>{
    const checkId=req.body.checkbox
    Item.findByIdAndRemove(checkId)
    .then(function(error){
        if(error){
            console.log('se borro el dato')
            res.redirect('/')
        }
    })
})

app.listen(process.env.PORT,()=>{
    console.log('servidor iniciado')
})