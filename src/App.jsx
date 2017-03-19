import React, { Component } from 'react'
import './App.css'
import Map from './components/Map.jsx'
import Dropdown from './components/Dropdown.jsx'
import * as d3 from 'd3'
import styled from 'styled-components'

const Title = styled.h1`
  color: crimson;
  margin: auto;
  max-width: 1000px;
  text-align: center;
`

const SubTitle = styled.h3`
  margin: auto;
  max-width: 1000px;
  text-align: center;
`

//for svg
const styles = {
  width: parseInt(d3.select('body').style('width'), 10) * .8,
  height: parseInt(d3.select('body').style('width'), 10) / 1.5,
}

class App extends Component {
  constructor() {
    super()

    this.callAPI = this.callAPI.bind(this)

    this.state = {
      apiJSON: null,
    } //end of state
  } //end constructor

//  componentWillMount() {
//    this.callAPI()
//  }

  callAPI(varCen, varState) {
    console.log('API varCen:', varCen)
    console.log('API varState:', varState)

    let cmp = this

    let state = varState === '' ? '&in=state:*' : '&in=state:' + varState

    let apiURL = `http://api.census.gov/data/2015/acs5?get=NAME,${varCen}&for=county:*${state}&key=26b5b4ec082f175445482165de0fe191cc145d62`
    console.log('APP apiURL:', apiURL)

    const usaCountyJSON =  'https://gist.githubusercontent.com/mendozaline/d9023583f18de57b8a9a71ce46c44400/raw/21945be2fa914b1a9aafa1d8ab8f9c65217cda85/us-counties.json'

    const totalUSPopulation = `http://api.census.gov/data/2015/acs5?get=NAME,B01001_001E&for=county:*${state}&key=26b5b4ec082f175445482165de0fe191cc145d62`
    console.log('API popURL:', totalUSPopulation)

    d3.queue()
      .defer(d3.json, usaCountyJSON)
      .defer(d3.json, apiURL)
      .defer(d3.json, totalUSPopulation)
      .await(function(error, countyJSON, apiData, popData) {
      //Loops through data and adds value to match in countyJSON

        for (var i = 0; i < apiData.length; i++) {
          //from the api - match w/ geojson
          let apiCountyFIP = apiData[i][3]
          let apiStateFIP = apiData[i][2]
          let apiCountyCode = apiCountyFIP + ':' + apiStateFIP
          //console.log('APP dataCountryCode:', dataCountryCode)

          //normalize data
          let dataValue1 = +apiData[i][1]
          let dataValue2 = +popData[i][1]
          let percent = (dataValue1/dataValue2) * 100
          //console.log('APP percent:', percent)

          //add 'county, state' property
          //console.log('APP apiData:', apiData)
          let countyState = apiData[i][0]
          //console.log('APP countyState:', countyState)

          for (var j = 0; j < countyJSON.features.length; j++) {
            //from geoJSON - match w/ api
            let jsonCountyFIP = countyJSON.features[j].properties.COUNTYFP
            let jsonStateFIP = countyJSON.features[j].properties.STATEFP
            let jsonCountyCode = jsonCountyFIP + ':' + jsonStateFIP

            if (apiCountyCode === jsonCountyCode) {
              countyJSON.features[j].properties.apiValue = percent
              countyJSON.features[j].properties.countyState = countyState
              break
            }
          }

        } //end for loops

        cmp.setState({
          apiJSON: countyJSON.features,
        }) //end setState

    }) //end await
  } //end callAPI

  render() {
    console.log('APP render apiJSON:', this.state.apiJSON)

    return (
      <div>
        <Title>Census Data Visualizer</Title>
        <SubTitle>Visualize the data!</SubTitle>
        <br />
        <Dropdown callAPI={this.callAPI} />
        <Map {...this.state} {...styles} />
      </div>
    ) //end return
  } //end render
} //end App

export default App;
