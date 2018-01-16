import React from "react";
import "./Article.css";
import DeleteBtn from "../../components/DeleteBtn";
import AddNoteBtn from "../../components/AddNoteBtn";
import Note from "../../components/Note";
import { Col, Row } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

const Article = ({article, deleteArticle, saveNote, toggleNoteEditor, newNote, handleInputChange, handleFormSubmit, deleteNote}) => {
  const formatDate = string => new Date(string).toLocaleDateString();
  article.date = formatDate(article.date);
  return (
    <Col size="md-12">
      <ListItem>
      <Row>
        <a target="_blank" href={article.href} className="itemInfoLink">
          <Col size="sm-4" className="itemInfoImg">
            <img
              src={article.image}
              alt={article.title}
              height="200"
            />
          </Col>
          <Col size="sm-5" className="itemInfoText">
            <h3>{article.title}</h3>
            <h3><small>saved {article.date}</small></h3>
          </Col>
        </a>
        <Col size="sm-3">
          <div className="articleButtonContainer">
            <DeleteBtn onClick={() => deleteArticle(article._id)} />
            {newNote.parentArticle !== article._id ?
            <AddNoteBtn onClick={() => toggleNoteEditor(article._id)} />
            : null}
          </div>
        </Col>
      </Row>
      {newNote.parentArticle === article._id ?
        //code
        <Row>
        <Col size="sm-10 sm-offset-1">
        <form className="new-note-form">
          <p>
          <label htmlFor="title">Title</label>
          <input
            value={newNote.title}
            name="title"
            id="title"
            placeholder="Subject of note"
            onChange={handleInputChange}
          />
          </p>
          <p>
          <label htmlFor="author">Author</label>
          <input
            value={newNote.author}
            name="author"
            id="author"
            placeholder="Your name"
            onChange={handleInputChange}
          />
          </p>
          <p>
          <label htmlFor="content">Note</label>
          <textarea
            value={newNote.content}
            name="content"
            id="content"
            placeholder="Your comment about the saved pattern"
            onChange={handleInputChange}
          />
          </p>
          <p>
            <button type="submit" onClick={handleFormSubmit}>Submit</button>
          </p>
        </form>
        </Col>
        </Row>
      : null}
      <Row>
      <Col size="md-12">
        {article.notes.length ? (
            <List>
              {article.notes.map(note => (
                <Note
                  note={note}
                  key={note._id}
                  deleteNote={deleteNote}
                />
              ))}
            </List>
          ) : null}
      </Col>
      </Row>
      </ListItem>
    </Col>
  );
};

export default Article;
