import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './views/Login'
import Signup from './views/Signup'
import Home from './views/Home'
import Project from './views/Project'

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/home/:idGroup" component={Home} />
      <Route exact path="/projects/new" component={Project} />
      <Route component={Error} />
    </Switch>
  </main>
)

export default Routes
