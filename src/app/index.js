import React from 'react';
import ReactDOM from 'react-dom';

import { getAllWindows } from './windows.js';
import App from './app.jsx';

(async () => {
  const windows = await getAllWindows(chrome);
  const mountPoint = document.querySelector('.mount-point');
  const props = { windows, chrome };

  ReactDOM.render(<App {...props} />, mountPoint);
})();
