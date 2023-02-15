import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../containers/Root';

const root = document.createElement('div');
root.id = 'crx-root-unique-id';
document.body.append(root);

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Root />
    </div>
  </React.StrictMode>,
  root
);
