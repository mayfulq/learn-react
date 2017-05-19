import './app.css'
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

import createHistory from 'history/createBrowserHistory'
const history = createHistory();


const Root =()=>(
    <Router history={history}>
       <div>
        <Switch>
            <Route exact path="/learn-react/demo-3/build/" component={StorePicker} />
            <Route exact path="/learn-react/demo-3/build/store/:storeId" component={App} />
            <Route component={NotFound} />
        </Switch>
        </div>
    </Router>
)


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
