import mongoose from "mongoose";
const itemSchema=new mongoose.Schema({
    img:String,
    brant:String,
    price:String,
    name:String,
    category:String
});
export const ItemModel = mongoose.model('items ',itemSchema);