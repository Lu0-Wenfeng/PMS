import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import UserDashboard from './components/User/UserDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/admin">
          <AdminDashboard />
        </Route>
        <Route path="/">
          <UserDashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App
