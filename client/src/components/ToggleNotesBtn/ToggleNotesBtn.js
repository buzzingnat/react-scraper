import React from "react";
import "./ToggleNotesBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const ToggleNotesBtn = props => (
  <span className="toggle-notes-btn" {...props}>
    📝
  </span>
);

export default ToggleNotesBtn;
