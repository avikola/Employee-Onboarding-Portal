import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import EmployeeView from "./components/EmployeeView";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/employee" component={EmployeeView} />
    </Router>
  );
}

export default App;
