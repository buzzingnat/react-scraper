import React from "react";
import "./SearchResults.css";
import { Row, Col } from "../../components/Grid";
import SaveBtn from "../../components/SaveBtn";

const SearchResults = props => {

  return (<ul className="list-group search-results">
	<button onClick={() => {
	    return ;
	}}>Cancle</button>
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
	          <SaveBtn onClick={() => props.saveArticle(result)} />
	        </Col>
	      </Row>
      </li>
    ) : null}

  </ul>);
}

export default SearchResults;
