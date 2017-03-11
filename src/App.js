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
//      json2: {},
//      req: null,
    } //end of state
  } //end constructor

  componentWillMount() {
    let cmp = this
    const year = 2010

    d3.queue()
      .defer(d3.json, 'https://gist.githubusercontent.com/mendozaline/225de8323932c72ca81d/raw/88fb99945f88d84162c47240aa5cf42bbbce95e1/mexicanStates.json')
      .defer(d3.csv, 'https://gist.githubusercontent.com/mendozaline/225de8323932c72ca81d/raw/88fb99945f88d84162c47240aa5cf42bbbce95e1/mexico.csv')
//      .defer(d3.json, "http://api.census.gov/data/2015/acs1?get=NAME,B01001_002E&for=county:*&in=state:08&key=26b5b4ec082f175445482165de0fe191cc145d62")
//      .defer(d3.request, "http://api.census.gov/data/2015/acs1?get=NAME,B01001_002E&for=county:*&in=state:08&key=26b5b4ec082f175445482165de0fe191cc145d62")

      .await(function(error, us, data, json, req) {
      //abstract into own fn and change data here
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
//          json2: json,
//          req: req,
        }) //end setState
      }) //end await
  } //end CWM

  render() {
//    console.log('IMPORT json:', json)
//    let response = null
//    if (this.state.req !== null) {
//      response = this.state.req.response
//      response = JSON.parse(response)
//    }

    console.log('APP json:', this.state.json)
    console.log('APP data:', this.state.data2)
//    console.log('APP req:', response)
//    console.log('APP json2', this.state.json)

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
