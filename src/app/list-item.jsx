import React from 'react';
import ListItemIcon from './list-item-icon.jsx';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.deleteHandler = this.deleteHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  deleteHandler(e) {
    e.stopPropagation();
    
    const {id, index, windowId} = this.props;
    this.props.deleteHandler(id, index, windowId);
  }

  clickHandler() {
    const {id, index, windowId} = this.props;
    this.props.clickHandler(id, index, windowId);
  }

  render() {
    return <li className="item" onClick={this.clickHandler}>
      <ListItemIcon favIconUrl={this.props.favIconUrl} />
      <div className="item__info">{this.props.title}</div>
      <div className="item__delete" onClick={this.deleteHandler}>delete</div>
    </li>;
  }
}
