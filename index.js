import express from "express";
import connectToDb from "./Mongodb/connection.js";
import itemRouter from "./Route/ItemRouter.js";
import userRouter from "./Route/user.js";
const app = express()

await connectToDb();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use("/product", itemRouter);
app.use("/user",userRouter);
app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(PORT, () => { console.log("run api app") });