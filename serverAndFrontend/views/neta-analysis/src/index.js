import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Container } from 'semantic-ui-react';
import {NetaNavBar} from './components/NetaNavBar/';
import AboutUs from './components/AboutUs/';
import Home from './components/Home/';
import ConsBasedControls from './components/ConsBasedControls/';
import StateBasedControls from './components/StateBasedControls/';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div className="wrapper">
            <NetaNavBar/>
            <Container>
                <Route exact path="/" component={Home}/>
                <Route path="/state-based" component={StateBasedControls} />
                <Route path="/constituency-based" component={ConsBasedControls} />
                <Route path="/about-us" component={AboutUs}/>
            </Container>
        </div>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
