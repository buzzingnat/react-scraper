import React, { Component } from "react";
import API from "../../utils/API";
import Search from "../Search";
import Saved from "../Saved";

class Home extends Component {

	state = {
	    articles: [],
	}

	loadArticles = () => {
		API.getArticles()
			.then(res => {
				this.setState({ articles: res.data });
			})
			.catch(err => console.log(err));
		}

	render() {
		return (
			<div>
				<Search
					articles={this.state.articles}
					loadArticles={this.loadArticles}
				/>
				<Saved
					articles={this.state.articles}
					loadArticles={this.loadArticles}
				/>
			</div>
		);
	}
}

export default Home;
