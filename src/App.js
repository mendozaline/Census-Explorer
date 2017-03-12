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

    this.callAPI = this.callAPI.bind(this)

    this.state = {
      apiJSON: null,
      censusVariable: 'Please select a variable',
    } //end of state
  } //end constructor

  callAPI() {
    let cmp = this

    let baseURL = 'http://api.census.gov/data/2015/acs5?get=NAME,'
    let censusVariable = this.state.censusVariable
    let county = '&for=county:*'
    let state = '&in=state:*'
    let key = '&key=26b5b4ec082f175445482165de0fe191cc145d62'

    let apiURL = baseURL + censusVariable + county + state + key
    //console.log('APP apiURL:', apiURL)

    const usaCountyJSON =  'https://gist.githubusercontent.com/anonymous/3237a4869e2c17e4bd423fb624354363/raw/2ffa1a7d445b04f6dc8297584252009f342366e3/tl_2016_us_county.json'

    const totalUSPopulation = 'http://api.census.gov/data/2015/acs5?get=NAME,B01001_001E&for=county:*&in=state:*&key=26b5b4ec082f175445482165de0fe191cc145d62'

    d3.queue()
      .defer(d3.json, usaCountyJSON)
      .defer(d3.json, apiURL)
      .defer(d3.json, totalUSPopulation)
      .await(function(error, usaJSON, apiData, popData) {
        //Loops through data and adds value to match in usaJSON
        for (var i = 0; i < apiData.length; i++) {
          //from the api
          let apiCountyFIP = apiData[i][3]
          let apiStateFIP = apiData[i][2]
          let apiCountyCode = apiCountyFIP + ':' + apiStateFIP
          //console.log('APP dataCountryCode:', dataCountryCode)

          let dataValue1 = +apiData[i][1]
          let dataValue2 = +popData[i][1]
          let percent = (dataValue1/dataValue2) * 100
          //console.log('APP percent:', percent)

          for (var j = 0; j < usaJSON.features.length; j++) {
            //from geoJSON
            let jsonCountyFIP = usaJSON.features[j].properties.COUNTYFP
            let jsonStateFIP = usaJSON.features[j].properties.STATEFP
            let jsonCountyCode = jsonCountyFIP + ':' + jsonStateFIP

            if (apiCountyCode === jsonCountyCode) {
              usaJSON.features[j].properties.apiValue = percent
              break
            }
          }

        } //end for loops

        cmp.setState({
          apiJSON: usaJSON.features,
        }) //end setState
    }) //end await
  } //end callAPI

//  componentWillMount() {
//    this.callAPI()
//  }

  render() {

    console.log('APP apiJSON:', this.state.apiJSON)
    console.log('APP cenVar:', this.state.censusVariable)

    return (
      <div>
        <h1>Census Data Visualizer</h1>
        <Map {...this.state} {...styles} />

      </div>
    ) //end return
  } //end render
} //end App

export default App;
