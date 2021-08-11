import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  state = {
    users: [],
    username: "",
  };

  async componentDidMount() {
    this.getUser();
    console.log(this.state.users);
  }

  getUser = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: res.data });
    this.getUser();
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  deleteUser = async (id) => {
    await axios.delete("http://localhost:4000/api/users/" + id);
    this.getUser();
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:4000/api/users", {
      username: this.state.username,
    });
    this.setState({ username: "" });
    this.getUser();
    console.log(res);
  };

  render() {
    return (
      <div className="content">
        Create usur
        <div className="form-users">
          <div className="content-form">
            <h3 className="title">Formulario</h3>
            <form onSubmit={this.onSubmit}>
              <div className="forgrup">
                <input
                  type="text"
                  name=""
                  className="form"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                />
              </div>
              <button type="submit">Guardar</button>
            </form>
          </div>
        </div>
        <div className="list-user">
          <ul>
            {this.state.users.map((user) => (
              <li
                onDoubleClick={() => this.deleteUser(user._id)}
                className="list-grups"
                key={user._id}>
                {user.username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
