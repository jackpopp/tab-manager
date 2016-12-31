import React from 'react';
import numberToWords from 'number-to-words';
import { pluralise } from './utils/utils.js';

export default class ClassName extends React.Component {
  constructor(props) {
    super(props);
  }

  renderList(windows) {
    return windows.map((window, index) => {
      const { tabs } = window;

      if (tabs.length === 0) return null;

      return <li>
        <a href={`#window-${index}`} className="item item--dark item--padded">
          Window {numberToWords.toWords(index + 1)} ({tabs.length} {pluralise('tab', tabs.length)})
        </a>
      </li>;
    });
  }

  render() {
    return <div className="legend">
      <ul>
      {this.renderList(this.props.windows)}
      </ul>
    </div>
  }
}
