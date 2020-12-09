import React from "react"
import jwt_decode from "jwt-decode"
import { BrowserRouter, Switch, Route } from "react-router-dom"

// Importing app files

import setTokenOnAllRoutes from "./utils/setTokenOnAllRoutes"
import { setCurrentUser, logOutUser } from "./redux/actions/authActions"

// Importing Custom Components

import Dashboard from "./components/Dashboard"
import NotFound from "./components/NotFound"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import OpenUrlPage from "./components/home/OpenUrlPage"

// check for existing user session / check for tokens

if (localStorage.jwtToken) {
  //set auth token header
  setTokenOnAllRoutes(localStorage.jwtToken)
  //decode token and get user information
  const decoded = jwt_decode(localStorage.jwtToken)

  //set user and isAuthenticated
  setCurrentUser(decoded)
  // check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // logout user
    logOutUser()
    // redirect to login
    window.location.href = "/"
  }
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/:shortUrl" component={OpenUrlPage} />
          <Route path="" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
