import axios from "axios";

export default {
  // Gets all articles
  // USED
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the article with the given id
  // NEVER USED
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  // USED
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Deletes the article with the given id
  // USED
  updateArticle: function(id) {
    return axios.put("/api/articles/" + id);
  },
  // Saves an article to the database
  // USED
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  // Saves a note to the database
  // USED
  saveNote: function(noteData) {
    return axios.post("/api/notes", noteData);
  },
  // Saves an article to the database
  // USED
  deleteNote: function(id) {
    return axios.delete("/api/notes/" + id);
  },
  // Scrapes several sites, returning JSON data
  // USED
  getPatternList: function() {
    return axios.get("/api/scrape");
  }
};
