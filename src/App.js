import React from 'react';
import PrivateRoute from "./UI/Components/PrivateRoute";
import Todos from "./UI/Routes/Todos";
import SignIn from "./UI/Routes/SignIn";
import AddClient from "./UI/Routes/AddClient"
import ClientList from "./UI/Routes/ClientList"
import Navigation from "./UI/Components/Navigation/Navigation"
import {Switch, Route} from "react-router-dom";
function App() {
  return (
    <div style = {{
      textAlign: "center"
    }}>
      <Navigation/>
      <Switch>
      
        <PrivateRoute path = "/clients">
          <ClientList/>
        </PrivateRoute>
        <Route path = "/addclient">
          <AddClient />
        </Route>
        <Route path = "/">
        <SignIn />
        </Route>
      </Switch>

    </div>
  );
}
export default App;