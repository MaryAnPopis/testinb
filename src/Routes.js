import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './views/Login'
import Signup from './views/Signup'
import Home from './views/Home'
import AddProject from './views/AddProject'
import Project from './views/Project'
import TestSuites from './views/TestSuites'
import AddSuite from './views/AddSuite'
import TestSuiteDetails from './views/TestSuiteDetails'
import PrivateRoute from './components/PrivateRoute'
import AddTestCase from './views/AddTestCase'
import AddTestRun from './views/AddTestRun'
import Testruns from './views/Testruns'
import TestRunDetails from './views/TestRunDetails'
import Run from './views/Run'

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/home/" component={Home} />
      <PrivateRoute exact path="/projects/new" component={AddProject} />
      <PrivateRoute exact path="/project/details/:idProject" component={Project} />
      <PrivateRoute exact path="/project/testsuites" component={TestSuites} />
      <PrivateRoute exact path="/add/testsuite" component={AddSuite} />
      <PrivateRoute exact path="/add/testrun" component={AddTestRun} />
      <PrivateRoute exact path="/testrun/:idTestRun" component={TestRunDetails} />
      <PrivateRoute exact path="/testruns" component={Testruns} />
      <PrivateRoute exact path="/testrun/:idTestRun/run" component={Run} />
      <PrivateRoute
        exact
        path="/project/testsuite/details/:idTestSuite"
        component={TestSuiteDetails}
      />
      <PrivateRoute
        exact
        path="/project/testsuite/details/:idTestSuite/addtestcase"
        component={AddTestCase}
      />
      <Route component={Error} />
    </Switch>
  </main>
)

export default Routes
