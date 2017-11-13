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
    var matchedItem = this.state.patterns.find(
      (item) => item.title === this.state.search
    );
    matchedItem ? this.setState({results: [matchedItem]}) : null;
  };

  render() {
    return (
      <Container style={{ minHeight: "80%" }}>
        <h1 className="text-center">Search for a Pattern!</h1>
        <SearchForm
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
          patterns={this.state.patterns}
        />
        <SearchResults
          results={this.state.results}
        />
      </Container>
    );
  }
}

export default Search;
