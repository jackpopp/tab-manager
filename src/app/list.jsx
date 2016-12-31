import React from 'react';
import numberToWords from 'number-to-words';
import ListItem from './list-item.jsx';
import Legend from './legend.jsx';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.deleteHandler = this.deleteHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = { windows: props.windows }
  }

  deleteHandler(id, index, windowId) {
    chrome.tabs.remove(id);
  }

  clickHandler(id, index, windowId) {
    chrome.tabs.update(id, {active: true});
    chrome.windows.update(windowId, {focused: true});
  }

  renderTabs(tabs) {
    return <ul>
      {tabs.map((tab) => {
        const props = {
          deleteHandler: this.deleteHandler,
          clickHandler: this.clickHandler,
          ...tab
        }
        return <ListItem {...props} />
      })}
    </ul>
  }

  renderWindows (windows) {
    return windows.map((window, index) => {
      if (window.tabs.length === 0) return null;

      return <li id={`window-${index}`}>
        <h2>Window {numberToWords.toWords(index + 1)}</h2>
        {this.renderTabs(window.tabs)}
      </li>;
    })
  }

  render() {
    // get rid of state for windows and just propagate the props.window
    return <div>
      <ul className="item-holder">
        {this.renderWindows(this.props.windows)}
      </ul>
      <Legend windows={this.props.windows}/>
    </div>;
  }
}
