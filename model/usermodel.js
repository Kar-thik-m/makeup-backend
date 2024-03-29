import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
    verify:String
});
export const userModel = mongoose.model('user',userSchema);