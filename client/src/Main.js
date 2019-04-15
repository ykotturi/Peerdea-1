import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Idea from './Idea'


function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/idea' component={Idea}/>
      </Switch>
    </main>
  );
};

export default Main 