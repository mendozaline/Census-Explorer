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
    this.dropdownSelect = this.dropdownSelect.bind(this)
    this.dropdownClick = this.dropdownClick.bind(this)

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

  dropdownSelect(event) {
    event.preventDefault()
    //console.log('APP dds evt.target.value:', event.target.value)
    this.setState({
      censusVariable: event.target.value
    })
  }

  dropdownClick() {
    //console.log('APP ddc censusVar: ', this.state.censusVariable)
    this.callAPI()
  }

  render() {

    console.log('APP apiJSON:', this.state.apiJSON)
    console.log('APP cenVar:', this.state.censusVariable)

    const censusVarCodes = [
      {name: '', varCode: ''},
      {name: 'WHITE ALONE', varCode: 'B01001A_001E'},
      {name: 'BLACK OR AFRICAN AMERICAN ALONE', varCode: 'B01001B_001E'},
      {name: 'AMERICAN INDIAN AND ALASKA NATIVE ALONE', varCode: 'B01001C_001E'},
      {name: 'ASIAN ALONE', varCode: 'B01001D_001E'},
      {name: 'NATIVE HAWAIIAN AND OTHER PACIFIC ISLANDER ALONE', varCode: 'B01001E_001E'},
      {name: 'SOME OTHER RACE ALONE', varCode: 'B01001F_001E'},
      {name: 'TWO OR MORE RACES', varCode: 'B01001G_001E'},
      {name: 'WHITE ALONE, NOT HISPANIC OR LATINO', varCode: 'B01001H_001E'},
      {name: 'HISPANIC OR LATINO', varCode: 'B01001I_001E'},
    ]

    let censusVarDropdown = censusVarCodes.map((cenVarObj, index) => {
      //console.log('APP cenVarObj', cenVarObj)
      return (
        <option key={index} value={cenVarObj.varCode}>
          {cenVarObj.name}
        </option>
      )
    })

    return (
      <div>
        <h1>Census Data Visualizer</h1>
        <div>
          <select
            value={this.state.censusVariable}
            onChange={this.dropdownSelect} >
            {censusVarDropdown}
          </select>

          <input
            type='submit'
            value='Send'
            onClick={this.dropdownClick} />
        </div>

        <Map {...this.state} {...styles} />

      </div>
    ) //end return
  } //end render
} //end App

export default App;
