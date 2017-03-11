import React, { Component } from 'react'
import './App.css'
import Map from './components/Map.jsx'

class App extends Component {
  constructor() {
    super()
    this.state = {
    }
  } //end constructor

  render() {
    return (
      <div>
        <h1>Census Data Visualizer</h1>
        <Map />
      </div>
    )
  }
}

export default App;
