import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import ChangeTask from './components/ChangeTask';
import TaskList from './components/TaskLIst';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/edit/:id">
            <ChangeTask />
          </Route>
          <Route path="/">
            <TaskList />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
