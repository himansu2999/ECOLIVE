import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Containers/Home/Home';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import Autherization from './Containers/Autherization/Autherization';
import FAQ from './Containers/FAQ/FAQ';
import ContactUs from './Containers/ContactUs/ContactUs';
import Products from './Containers/Products/Products';
import Dashboard from './Containers/Dashboard/Dashboard';
import Product from './Containers/Products/Products';
import Blog from './components/HomeComponents/Blog/Blog';
import CardFlip from './components/UI/CardFlip/CardFlip';
import Footer from './components/Footer/Footer';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from './components/UI/Card/Cards';
 


class App extends Component {
  state = {
    isAuthorized: true,
    authorized:true
  }
  render() {
    let dashboard = <Redirect from="/Dashboard" to="/" />;
    if(this.state.isAuthorized){
      dashboard = <Route path="/Dashboard" component={Dashboard} />
    }
    return (
      <div className="App">
        <Toolbar />
        <div style={{ marginTop: '70px'}}></div>
        <Switch>
          {dashboard}
          <Route path="/Products" component={Products} />
          <Route path="/Autherization" component={Autherization} />
          <Route path="/ContactUs" component={ContactUs} />
          <Route path="/" exact component={Home} />
          <Route path="/FAQ" exact component={FAQ} />
        </Switch>
        
      </div>
      );
  }
}


export default App;
