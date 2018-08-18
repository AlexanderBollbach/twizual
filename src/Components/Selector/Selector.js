import React from "react";
import Styles from "./Selector.css";

export default class Selector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: ""
    };
  }

  componentDidMount() {
    const { options } = this.props;
    if (options && options.length > 0) {
      this.setState({
        selected: options[0]
      });
    }
  }

  handleChange = e => {
    this.props.optionSelected(e.target.value);
  };

  render() {
    const { options, initialOption } = this.props;
    const opts = options.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ));

    return (
      <select
        value={initialOption}
        onChange={this.handleChange}
        className={Styles.Select}
      >
        {opts}
      </select>
    );
  }
}
