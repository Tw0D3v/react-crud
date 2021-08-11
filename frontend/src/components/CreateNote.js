import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default class CreateNote extends Component {
  state = {
    title: "",
    content: "",
    date: new Date(),
    userSelected: "",
    users: [],
    editing: false,
    _id: "",
  };
  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({
      users: res.data.map((user) => user.username),
      userSelected: res.data[0].username,
    });

    if (this.props.match.params.id) {
      console.log(this.props.match.params.id);
      const res = await axios.get(
        "http://localhost:4000/api/notes/" + this.props.match.params.id
      );
      console.log(res.data);
      this.setState({
        title: res.data.title,
        content: res.data.content,
        userSelected: res.data.author,
        _id: res.data._id,
        editing: true,
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      date: this.state.date,
      title: this.state.title,
      content: this.state.content,
      author: this.state.userSelected,
    };

    if (this.state.editing) {
      await axios.put(
        "http://localhost:4000/api/notes/" + this.state._id,
        newNote
      );
    } else {
      await axios.post("http://localhost:4000/api/notes", newNote);
    }

    window.location.href = "/";
  };

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});
  };

  onChangeDate = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div>
        <div className="container">
          <h4>Create Note</h4>
          <form onSubmit={this.onSubmit}>
            <select
              name="userSelected"
              onChange={this.onInputChange}
              value={this.state.userSelected}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>

            <div className="from text">
              <input
                type="text"
                name="title"
                className=""
                id=""
                required
                onChange={this.onInputChange}
                value={this.state.title}
              />
            </div>
            <div className="fiormtex">
              <div className="fomulario">
                <textarea
                  type="text"
                  className="form-control"
                  name="content"
                  onChange={this.onInputChange}
                  value={this.state.content}
                  required
                ></textarea>
              </div>
            </div>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
            <div>
              <button type="submit">save note</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
