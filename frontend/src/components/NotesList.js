import React, { Component } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default class NotesList extends Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    this.getNotes();
  }

  async getNotes() {
    const res = await axios.get("http://localhost:4000/api/notes");
    this.setState({ notes: res.data });
  }

  deleteNote = async (id) => {
    await axios.delete("http://localhost:4000/api/notes/" + id);
    this.getNotes();
  };

  render() {
    return (
      <div className="row">
        {this.state.notes.map((note) => (
          <div key={note._id}>
            <div>
              <h4>{note.title}</h4>
            </div>
            <div>
              <p>{note.content}</p>
              <p>{note.author}</p>
              <p>{format(note.date)}</p>
            </div>
            <div>
              <button onClick={() => this.deleteNote(note._id)}>
                eliminar
              </button>

              <Link to={"/edit/" + note._id}>Editar</Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
