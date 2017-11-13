import React from "react";
import "./AddNoteBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const AddNoteBtn = props => (
  <span className="add-note-btn" {...props}>
    +note
  </span>
);

export default AddNoteBtn;
