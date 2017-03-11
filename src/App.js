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
//      json2: null,
//      req: null,
    } //end of state
  } //end constructor

  componentWillMount() {
    let cmp = this

    d3.queue()
      .defer(d3.json, 'https://gist.githubusercontent.com/anonymous/3237a4869e2c17e4bd423fb624354363/raw/2ffa1a7d445b04f6dc8297584252009f342366e3/tl_2016_us_county.json')
      .defer(d3.json, 'http://api.census.gov/data/2015/acs5?get=NAME,B01001B_031E&for=county:*&in=state:*&key=26b5b4ec082f175445482165de0fe191cc145d62')
//      .defer(d3.request, "http://api.census.gov/data/2015/acs1?get=NAME,B01001_002E&for=county:*&in=state:08&key=26b5b4ec082f175445482165de0fe191cc145d62")
      .await(function(error, json, data) {
      //abstract into own fn and change data here
        for (var i = 0; i < data.length; i++) {
          //from the api
          let apiCountyFIP = data[i][3]
          let apiStateFIP = data[i][2]
          var dataCountryCode =  apiCountyFIP + ', ' + apiStateFIP
//          console.log('dataCountryCode:', dataCountryCode)

          var dataValue = +data[i][1]
//          console.log('dataValue:', dataValue)

          for (var j = 0; j < json.features.length; j++) {
            //from geoJSON
            let jsonCountyFIP = json.features[j].properties.COUNTYFP
            let jsonStateFIP = json.features[j].properties.STATEFP
            var jsonCountyCode = jsonCountyFIP + ', ' + jsonStateFIP

            if (dataCountryCode === jsonCountyCode) {
              json.features[j].properties.value = dataValue

              break
            }
          }
        }

      console.log('data!', data)

      let formatData = data.filter(arr => {
        return arr[0] !== 'NAME'
      })
      console.log('forData!!!', formatData)

        cmp.setState({
//          json: us.features,
          json: json.features,
          data2: formatData,
//          json2: json.features,
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
