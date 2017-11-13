import React from "react";
import { Col, Row } from "../../components/Grid";
import { ListItem } from "../../components/List";
import DeleteBtn from "../../components/DeleteBtn";

const Note = ({note, deleteNote}) => {
  return (
    <ListItem>
      <Row>
        <Col size="xs-10">
          <h4>{note.title}<small> by {note.author}</small></h4>
          <p>{note.content}</p>
        </Col>
        <Col size="xs-2">
          <DeleteBtn onClick={() => deleteNote(note._id)} />
        </Col>
      </Row>
    </ListItem>
  );
};

export default Note;
