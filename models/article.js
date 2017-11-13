const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  href: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

const Article = mongoose.model("Article", articleSchema);

articleSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

module.exports = Article;
