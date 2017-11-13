import React from "react";
import "./SearchResults.css";
import API from "../../utils/API";
import { Row, Col } from "../../components/Grid";
import SaveBtn from "../../components/SaveBtn";

const SearchResults = props => {
  var saveArticle = (input) => {
    const data = {
    	title: input.title,
    	image: input.image,
    	href: input.externalLink
    };
    API.saveArticle(data)
	    .then((result) => console.log(`saved result succesfully`, result))
	    .catch(err => console.log(`ERROR:`, err));
  };

  return (<ul className="list-group search-results">
    {props.results ? props.results.map(result =>
      <li key={result.href} className="list-group-item">
	      <Row>
	        <Col size="xs-8">
	          <a target="_blank" href={result.href}>
	              <h3>{result.title}</h3>
	              <img
	                src={result.image}
	                alt={result.title}
	                className="img-responsive"
	              />
	          </a>
	        </Col>
	        <Col size="xs-2">
	          <SaveBtn onClick={() => saveArticle(result)} />
	        </Col>
	      </Row>
      </li>
    ) : null}

  </ul>);
}

export default SearchResults;
