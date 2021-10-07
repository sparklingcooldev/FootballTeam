import { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute';
import First from './pages/First';
import LoginPg from './pages/LoginPg';
import Dashboard from './pages/Dashboard';
import PelletEntryAdd from './pages/Pellet/PelletEntryAdd';
import Welcome from './pages/Welcome';
import './utils/api'

class App extends Component {
  render() {
    return  <Router>
              <Switch>
                <Route exact path="/" component={First} />
                <Route exact path="/login" component={LoginPg} />
                <PrivateRoute exact path="/pellet_add" component={PelletEntryAdd} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route path="/confirm/:confirmationCode" component={Welcome} />
              </Switch>
            </Router>;
  }
};

export default App;
