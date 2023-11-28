import mongoose from "mongoose"

const itemSchema={
    nombre:String
}

const Item=mongoose.model('Item',itemSchema)

const item1= new Item({nombre:'texto de ejemplo 1'})
const item2= new Item({nombre:'texto de ejemplo 2'})
const item3= new Item({nombre:'texto de ejemplo 3'})

const defaultItems=[item1,item2,item3]


export { Item, defaultItems }