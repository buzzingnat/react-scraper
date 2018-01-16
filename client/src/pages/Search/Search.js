import React, { Component } from "react";
import API from "../../utils/API";
import Container from "../../components/Container";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";

class Search extends Component {
  state = {
    search: "",
    patterns: [],
    results: [],
    error: "",
    itemToSave: {},
    // TODO: split item titles on spaces to make a
    // set of unique keywords, then use those to search
    // for an array of matching items with the search/select button
    // keywordList: []
  };

  // When the component mounts, scrape info from selected sites and store in state
  // get list of front page free patterns for yarnspirations.com:
  // http://www.yarnspirations.com/patterns/free-knitting-patterns
  // TODO: also scrape from other sites:
  // http://www.knitpicks.com/patterns/Free_Knitting_Patterns__L300218.html
  // https://www.loveknitting.com/us/free-knitting-patterns
  // https://www.allfreeknitting.com/tag/easy-knitting-patterns
  componentDidMount() {
    API.getPatternList()
      .then(res => this.setState({ patterns: res.data }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    console.log(event.target.value);
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const matchedItem = this.state.patterns.find(
      (item) => item.title === this.state.search
    );
    matchedItem ? this.setState({results: [matchedItem], search: ""}) : null;
  };

  cancelSearch = () => {
    this.setState({ search: "" });
  };

  saveArticle = input => {
    const itemToSave = {
      title: input.title,
      image: input.image,
      href: input.externalLink
    };
    this.setState(
      {itemToSave}, () => {
        API.saveArticle(this.state.itemToSave)
          .then((res) => {
            this.props.loadArticles();
            this.setState({
              itemToSave: {},
              results: []
            });

            console.log(`saved result succesfully`, res);
          })
          .catch(err => console.log(`ERROR:`, err));
      });
  }

  render() {
    return (
      <Container style={{ minHeight: "70%" }}>
        <h2 className="text-center" style={{ marginTop: ".2em" }}>Search for a Pattern!</h2>
        <SearchForm
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          patterns={this.state.patterns}
        />
        {this.state.results[0] ?
        <SearchResults
          results={this.state.results}
          itemToSave={this.state.itemToSave}
          saveArticle={this.saveArticle}
        />
        : null}
      </Container>
    );
  }
}

export default Search;
