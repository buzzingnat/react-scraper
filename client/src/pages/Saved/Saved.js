import React, { Component } from "react";
import Article from "../../components/Article";
import Jumbotron from "../../components/Jumbotron";
import { Row, Container } from "../../components/Grid";
import { List } from "../../components/List";
import API from "../../utils/API";

class Saved extends Component {
  state = {
    newNote: {
      title: '',
      author: '',
      content: '',
      parentArticle: ''
    }
  };
  // When this component mounts, grab all saved articles in database
  componentDidMount() {
    this.props.loadArticles();
  }

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.props.loadArticles())
      .catch(err => console.log(err));
  }

  deleteNote = id => {
    API.deleteNote(id)
      .then(res => this.props.loadArticles())
      .catch(err => console.log(err));
  }

  saveNote = (noteData) => {
    API.saveNote(noteData)
      .then(res => {
        console.log(`response`, res);
        this.props.loadArticles();
        const newNote = {title: '', author: '', content: '', parentArticle: ''}
        this.setState({newNote})
      })
      .catch(err => console.log(err));
  }

  toggleNoteEditor = (id) => {
    const newNote = {
       ...this.state.newNote,
       parentArticle: id,
    };
    this.setState({newNote}, () => {
      //console.log(`the newNote is now:`, this.state.newNote, `\n\n\n`);
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    const newNote = {
       ...this.state.newNote,
       [name]: value,
    };
    this.setState({newNote});
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.newNote.title
      && this.state.newNote.author
      && this.state.newNote.content
      && this.state.newNote.parentArticle) {
      console.log(`valid values to attempt saving`);
      this.saveNote({
        title: this.state.newNote.title,
        author: this.state.newNote.author,
        content: this.state.newNote.content,
        parentArticle: this.state.newNote.parentArticle
      });
    }
  };

  render() {
    // b/c the loading is async, check that data exists before displaying it
    // can use this space to show a loading image instead of "null"
    // console.log(`articles:`, this.props.articles);
    return (
      <Container fluid>
        <Row>
            {this.props.articles.length ? (
              <List>

            <hr />
                <h1 className="text-center">Saved Patterns</h1>
                {this.props.articles.map(article => (
                  <Article
                    article={article}
                    deleteArticle={this.deleteArticle}
                    saveNote={this.saveNote}
                    deleteNote={this.deleteNote}
                    toggleNoteEditor={this.toggleNoteEditor}
                    newNote={this.state.newNote}
                    handleFormSubmit={this.handleFormSubmit}
                    handleInputChange={this.handleInputChange}
                    key={article._id}
                  />
                ))}
              </List>
            ) : (
              <h3>No Saved Patterns to Display</h3>
            )}
        </Row>
      </Container>
    );
  }
}

export default Saved;
