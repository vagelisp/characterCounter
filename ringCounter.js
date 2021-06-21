import React, { Component } from "react";
import "./ringCounter.scss";
class RingCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChar: this.props.countThis,
      maxChar: this.props.setMaxTo,
      ringStyle: {
        stroke: "",
        strokeDasharray: "",
      },
    };
  }
  componentDidMount() {
    let countThis = this.props.countThis;
    let totalChars = countThis.length;
    this.setState({
      totalChars: totalChars,
    });
    this.styleChange(totalChars);
  }

  styleChange = (totalChars) => {
    const r = 10;
    const circleLength = 2 * Math.PI * r;
    let numChar = this.state.numChar;
    let coloured = (circleLength * numChar.length) / this.state.maxChar;
    let gray = circleLength - coloured;
    let currentPercentage = this.percentage(this.state.maxChar, totalChars);
    this.setState({
      countThis: totalChars,
      ringStyle: {
        stroke:
          currentPercentage == 100
            ? "red"
            : currentPercentage >= 75
            ? "orange"
            : "green",
        strokeDasharray: `${coloured} ${gray}`,
      },
    });
  };

  percentage = (current, total) => {
    return Math.round((total / current) * 100);
  };

  render() {
    const { ringStyle, totalChars } = this.state;
    return (
      <div id="counter">
        <svg shape-rendering="auto">
          <circle id="gray" cx="50%" cy="50%" r="10"></circle>
          <circle
            id="coloured"
            cx="50%"
            cy="50%"
            r="10"
            style={ringStyle}
          ></circle>
          <text
            x="50%"
            y="50%"
            text-anchor="middle"
            stroke={ringStyle.stroke}
            dy=".3em"
          >
            {totalChars}
          </text>
        </svg>
      </div>
    );
  }
}

export default RingCounter;
