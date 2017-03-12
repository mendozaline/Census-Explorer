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
//      req: null,
    } //end of state
  } //end constructor

  componentWillMount() {
    let cmp = this

    let baseUrl = 'http://api.census.gov/data/2015/acs5?get=NAME,'
    let variable = 'B01001I_002E' //hispanic men
    let county =  '&for=county:*'
    let state = '&in=state:*'
    let key = '&key=26b5b4ec082f175445482165de0fe191cc145d62'
    let url = baseUrl + variable + county + state + key

    d3.queue()
      .defer(d3.json, 'https://gist.githubusercontent.com/anonymous/3237a4869e2c17e4bd423fb624354363/raw/2ffa1a7d445b04f6dc8297584252009f342366e3/tl_2016_us_county.json')
      .defer(d3.json, url) //all his men
      .defer(d3.json, 'http://api.census.gov/data/2015/acs5?get=NAME,B01001_001E&for=county:*&in=state:*&key=26b5b4ec082f175445482165de0fe191cc145d62') //all pop
//      .defer(d3.request, "http://api.census.gov/data/2015/acs1?get=NAME,B01001_002E&for=county:*&in=state:08&key=26b5b4ec082f175445482165de0fe191cc145d62")
      .await(function(error, json, data, data2) {
      //Loops through data and adds value to match in json
      //abstract into own fn and change data here
      for (var i = 0; i < data.length; i++) {
          //from the api
          let apiCountyFIP = data[i][3]
          let apiStateFIP = data[i][2]
          var dataCountryCode =  apiCountyFIP + ', ' + apiStateFIP
//          console.log('dataCountryCode:', dataCountryCode)

          var dataValue1 = +data[i][1]
          var dataValue2 = +data2[i][1]
          var dataValue = (dataValue1/dataValue2) * 100
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
      } //end for loops

        //Remove header array from census data
        console.log('unformattedData:', data)
        let formatData = data.filter(arr => {
          return arr[0] !== 'NAME'
        })
        console.log('formattedData:', formatData)

        cmp.setState({
          json: json.features,
          data2: formatData,
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
