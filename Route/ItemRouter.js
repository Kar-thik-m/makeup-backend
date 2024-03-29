import express from "express";
import { ItemModel } from "../model/itemmodel.js";
const itemRouter = express.Router();
itemRouter.post("/upload", async (req, res) => {
    try {
        const item = new ItemModel({ ...req.body });
        await item.save();
        res.send({ msg: 'Item created' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Error in creating item' });
    }
});

itemRouter.get("/allitems", async (req, res) => {
    try {
        const item= await ItemModel.find({});
        res.send(item );
    } catch (err) {
        console.log(err);
        res.status(500).send({ msg: 'Error in creating item' });
    }
});
export default itemRouter;