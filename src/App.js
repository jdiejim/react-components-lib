import React, { Component } from 'react';
import SideMenu from './components/SideMenu';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
    }
  }

  moveMenu() {
    this.setState({
      isHidden: !this.state.isHidden,
    })
  }

  render() {
    return (
      <div className="App">
        <button className='btn' onClick={this.moveMenu.bind(this)}>Click</button>
        <SideMenu
          isHidden={this.state.isHidden}>
          <a>Home</a>
          <a>Contact</a>
          <a>About</a>
          <a>Pricing</a>
          <a>Pricing</a>
          <a>Pricing</a>
          <a>Pricing</a>
        </SideMenu>
      </div>
    );
  }
}

export default App;
