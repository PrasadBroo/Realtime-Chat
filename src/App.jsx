import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthunticateContextProvider from "./contexts/AuthunticateContext";

import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Signupage from "./pages/Signupage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <React.Fragment>
      <Router>
        <AuthunticateContextProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Homepage}></Route>
            <Route exact path="/login" component={Loginpage}></Route>
            <Route exact path="/signup" component={Signupage}></Route>
          </Switch>
        </AuthunticateContextProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
