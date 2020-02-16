import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/js/src/collapse.js";
import "video-react/dist/video-react.css";


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
