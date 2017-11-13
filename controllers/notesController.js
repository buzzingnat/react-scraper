const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Note
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Note
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Note
      .create(req.body)
      .then(note => {
        db.Article.findById(note.parentArticle)
        .then(article => {
          console.log(`found article:`, article);
          return db.Article.findByIdAndUpdate(article._id, {$set: {notes: [...article.notes, note._id]}})
        })
        return res.json(note)
      })
      .catch(err => res.status(422).json({err: err, message: 'notesController.js, line 28'}));
  },
  update: function(req, res) {
    db.Note
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // remove note, then find parent article
  // remove referenced note id from article as well
  remove: function(req, res) {
    db.Note
      .findById({ _id: req.params.id })
      .then(note => {
        db.Article.findByIdAndUpdate(
        note.parentArticle, {$set: {notes: {$pull: note._id} }}
        );
        note.remove();
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

        // db.Note.deleteMany({id: { $in: article.notes}});
        // article.remove();
  }
};
