import React, { Component } from "react";

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          height: "50%",
          gridGap: "5%"
        }}
      >
        <input
          placeholder="Add a new twitter user"
          style={{ paddingLeft: "10" }}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={() => this.props.onSubmit(this.state.value)}>
          add user
        </button>
      </div>
      // <form
      //   onSubmit={e => {
      //     e.preventDefault();
      //     this.props.onSubmit(this.state.value);
      //   }}
      // >
      //   <label>
      //     Name:
      //     <input
      //       type="text"
      //       value={this.state.value}
      //       onChange={this.handleChange}
      //     />
      //   </label>
      //   <input type="submit" value="Submit" />
      // </form>
    );
  }
}
