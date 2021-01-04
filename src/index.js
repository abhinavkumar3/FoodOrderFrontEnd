import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router} from "react-router-dom";
import FoodOrdering from './FoodOrdering';

ReactDOM.render(
    <Router>
        <FoodOrdering />
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
