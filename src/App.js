import React, { Component } from 'react'
import './App.css'
import Map from './components/Map.jsx'
import * as d3 from 'd3'
//import json from './mexicanStates.json'

//for svg
const styles = {
  width   : 750,
  height  : 500,
  padding : 10,
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      json: null,
      data2: null,
    } //end of state
  } //end constructor

  componentWillMount() {
    let cmp = this
    const year = 2010

    d3.queue()
      .defer(d3.json, 'https://gist.githubusercontent.com/mendozaline/225de8323932c72ca81d/raw/88fb99945f88d84162c47240aa5cf42bbbce95e1/mexicanStates.json')
      .defer(d3.csv, "https://gist.githubusercontent.com/mendozaline/225de8323932c72ca81d/raw/88fb99945f88d84162c47240aa5cf42bbbce95e1/mexico.csv")
      .await(function(error, us, data) { //abstract into own fn
        for (var i = 0; i < data.length; i++) {
          var dataCountryCode = data[i].state
          var dataValue = +data[i][year]

          for (var j = 0; j < us.features.length; j++) {
            var jsonCountryCode = us.features[j].properties.name

            if (dataCountryCode === jsonCountryCode) {
              us.features[j].properties.homicide = dataValue

              break
            }
          }
        }

        cmp.setState({
          json: us.features,
          data2: data,
        }) //end setState
      }) //end await
  } //end CWM

  render() {
//    console.log('IMPORT j:', json)
    console.log('j:', this.state.json)
    console.log('data', this.state.data2)

    return (
      <div>
        <h1>Census Data Visualizer</h1>
        <Map
          {...this.state}
          {...styles} />

      </div>
    ) //end return
  } //end render
} //end App

export default App;
