import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  author: { type: String, required: true },
  identifier: { type: String, default: "identifier" }
})

const quoteModel = mongoose.model("quoteModel", quoteSchema);

export default quoteModel;