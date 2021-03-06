const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  content: String,
  date: { type: Date, default: Date.now },
  parentArticle: {
	type: Schema.Types.ObjectId,
	ref: "Article"
  }
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
