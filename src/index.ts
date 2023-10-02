import express from "express";
import {
    port,
    mongo_url
} from "./config.json";
import mongoose from "mongoose";
import quoteModel from "./models/quote";
mongoose.connect(mongo_url, () => {
    console.log("Successfully connected to database!");
})
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.status(500)
    res.send("Homepage!");
    res.send("This API doesn't support get requests for now")
})
app.get("/random", (req, res) => {
    res.status(200)
    quoteModel.find({ identifier: "identifier" }, (err, doc) => {
        if (!err) {
            const result = doc[Math.floor(Math.random() * doc.length)];
            const objectToSend = {
                quote: result.quote,
                author: result.author
            }
            res.json(objectToSend);
        }
        else {
            res.send("There has been an error on our side. Please try again later!");
        }
    })
})

app.get("/new", (req, res) => {
    res.status(200)
    const responses = req.body;

    quoteModel.create({ author: responses.author, quote: responses.quote })
    res.send("Successfully added new quote!");
})
app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
