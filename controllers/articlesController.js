const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Article.find(req.query).populate('notes').exec().then(articles => {
      res.json(articles);
    }).catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // remove article, then find all children notes
  // delete all notes from note collection
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(article => {
        db.Note.deleteMany({id: { $in: article.notes}});
        article.remove();
      }).then(() => res.json({success: true}))
      .catch(err => res.status(422).json(err));
  }
};
