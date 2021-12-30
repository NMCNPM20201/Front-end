import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./Layout";
import Error from "../pages/error";
import Genurl from "../pages/genurl";
<<<<<<< HEAD
import News from "../pages/news";
=======
>>>>>>> Hiep

function App() {

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props => React.createElement(component, props)
        }
      />
    );
  }

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <Route exact path="/genurl" component={Genurl} />
<<<<<<< HEAD
        <Route exact path="/news" component={News} />
=======
>>>>>>> Hiep
        <PrivateRoute path="/app" component={Layout} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

}

export default App;