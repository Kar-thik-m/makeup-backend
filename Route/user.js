import express from 'express';
import { userModel } from '../model/usermodel.js';
import {v4} from 'uuid';
import bcrypt from 'bcrypt';

const userRouter=express.Router();


//register 
userRouter.post('/register',async function(req, res){
    try{
        const payload=req.body;
        const userCheck=await userModel.findOne({email:payload.email})
        if(userCheck)
        {
            res.status(409).send({message:"user already exist"})
            return;
        }
        bcrypt.hash(payload.password,10,async function(err,hash){
            if(err){
                res.status(500).send({message:"error in encrypting password"})
            }
        const userdata=new userModel({...payload,password:hash,id:v4()});
        await userdata.save();
        res.send({message:"user registered successfully"});
        })
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:"error in resistering user details"});
    }
})


userRouter.post('/login', async function(req, res) {
    try {
        const { email, password } = req.body;
        
     
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).send({ message: "User not found" });
        }

        bcrypt.compare(password, existingUser.password, function(err, result) {
            if (err) {
                return res.status(500).send({ message: "Error in comparing passwords" });
            }
            if (!result) {
                return res.status(401).send({ message: "Incorrect password" });
            }
            
            res.send({ message: "Login successful",  });
        });
    } catch (error) {
       
        res.status(500).send({ message: "Error in logging in" });
    }
});



export default userRouter;