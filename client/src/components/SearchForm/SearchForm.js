import React from "react";
import "./SearchForm.css";

// Using the datalist element we can create autofill suggestions based on the props.patterns array
const SearchForm = props =>
  <form className="search">
    <div className="form-group">
      <label htmlFor="pattern">Type of Pattern:</label>
      <input
        value={props.search}
        onChange={props.handleInputChange}
        name="pattern"
        list="patterns"
        type="text"
        className="form-control"
        placeholder="Type in the kind of item you would like to knit"
        id="pattern"
      />
      <datalist id="patterns">
        {props.patterns.map(pattern => <option value={pattern.title} key={pattern.link} />)}
      </datalist>
      <button
        type="submit"
        onClick={props.handleFormSubmit}
        className="btn btn-success"
      >
        Select
      </button>
    </div>
  </form>;

export default SearchForm;
