import React, { Component } from 'react';

import './App.css';
import routes from './routes';
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";


export class App extends Component {

    showContentMenus = (routes) => {
        var result = null;
        if (routes.length > 0) {
          result = routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            );
          });
        }
        return <Switch>{result}</Switch>
      }

    render() {
        return (
            <Router>
            <div>
                {this.showContentMenus(routes)}
            </div>
            </Router>
        )
    }
}

export default App

