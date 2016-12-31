import React from 'react';

import List from './list.jsx';
import { getAllWindows, getWindow, getTab } from './windows.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { windows: props.windows };
    this.createBrowserHandlers(this.props.chrome);
  }

  createBrowserHandlers(browser) {
    chrome.tabs.onCreated.addListener((tab) => { this.updateWindowByTabObject(tab, browser) });
    chrome.tabs.onRemoved.addListener((tab) => { this.renderAllWindows(browser) });
    chrome.tabs.onAttached.addListener((tab) => { this.renderAllWindows(browser) });
    chrome.tabs.onDetached.addListener((tab) => { this.renderAllWindows(browser) });
    chrome.tabs.onMoved.addListener((tab) => { this.updateWindowByTabId(browser) });
    chrome.tabs.onUpdated.addListener((tab) => {
      // debounce as it gets called multiple times on update
      this.updateWindowByTabId(tab, browser)
    });
  }

  /*
    Add the new tab into the window and set the state
  */
  async updateWindowByTabObject(tab, browser) {
    const updatedWindow = await getWindow(tab.windowId, browser);
    const windows = await getAllWindows(browser);
    const windowIndex = windows.findIndex(window => (window.id === updatedWindow.id));
    if (windowIndex === -1) {
      return this.renderAllWindows(browser);
    }
    // do anything with status?
    windows[windowIndex] = updatedWindow;
    this.setState({ windows: windows });
  }

  /*
    Use the provided tab ID to retrieve the window id it is in
   */
  async updateWindowByTabId(tabId, browser) {
    const tab = await getTab(tabId, browser);
    this.updateWindowByTabObject(tab, browser);
  }

  /*
    If a tab is moved between windows we just render em all again
  */
  async renderAllWindows(browser) {
    const windows = await getAllWindows(browser);
    // remove windows with no tabs
    this.setState({ windows: windows });
  }

  render() {
    return <div>
      <List windows={this.state.windows} />
    </div>
  }
}
