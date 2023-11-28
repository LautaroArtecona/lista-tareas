import express from 'express'
import { Item, defaultItems } from '../models/items.js'

const router=express.Router()

router.get('/',(req,res)=>{
    Item.find({})
    .then(function(foundItems){
        if(foundItems.length === 0){
            Item.insertMany(defaultItems)
            console.log('se insertaron de forma correcta en la BD')
        }else{
            console.log(foundItems)
            res.render('pages/list',{listTitle:'hoy', newListItems:foundItems})
        }
    })
})

router.post('/',(req,res)=>{
    const itemNombre=req.body.newTodo
    const item=new Item({
        nombre:itemNombre
    })
    item.save()
    res.redirect('/')
})

router.post('/delete',(req,res)=>{
    const checkId=req.body.checkbox
    Item.findByIdAndRemove(checkId)
    .then(function(error){
        if(error){
            console.log('se borro el dato')
            res.redirect('/')
        }
    })
})

export default router