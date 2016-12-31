import React from 'react';

export default class ListItemIcon extends React.Component {
  constructor(props) {
    super(props)
  }

  makeIcon(favIconUrl = "") {
    if (favIconUrl === "" || favIconUrl.match(/(png|jpg|jpeg|ico)/) === null) {
      const colors = ["#1abc9c", "#9b59b6", "#f1c40f", "#aec6cf", "#cfcfc4", "#b39eb5"];
      const index = Math.floor(Math.random() * colors.length);
      return { backgroundColor:  colors[index]};
    }

    return { backgroundImage: `url(${favIconUrl})` };
  }

  render() {
    return <div className="item__icon" style={this.makeIcon(this.props.favIconUrl)}></div>
  }
}
