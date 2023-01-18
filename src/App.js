import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Dashboard } from "./components/dashboard";

import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" exact component={Dashboard} />
      <div className="App">
        <p>Welcome to the Hidden Library</p>
      </div>
    </Router>
  );
}

export default App;
