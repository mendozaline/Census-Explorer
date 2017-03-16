import React, { Component } from 'react'
import './App.css'
import Map from './components/Map.jsx'
import Dropdown from './components/Dropdown.jsx'
import * as d3 from 'd3'

//for svg
const styles = {
  width: parseInt(d3.select('body').style('width'), 10) * .8,
  height: parseInt(d3.select('body').style('width'), 10) / 1.5,
}

class App extends Component {
  constructor() {
    super()

    this.receiveCensusVariable = this.receiveCensusVariable.bind(this)
    this.visualizeClick = this.visualizeClick.bind(this)
    this.callAPI = this.callAPI.bind(this)

    this.state = {
      apiJSON: null,
      censusVariable: null,
    } //end of state
  } //end constructor

  componentWillMount() {
    this.callAPI()
  }

  callAPI() {
    let cmp = this

    let baseURL = 'http://api.census.gov/data/2015/acs5?get=NAME,'
    let censusVariable = this.state.censusVariable
    let county = '&for=county:*'
    let state = '&in=state:*'
    let key = '&key=26b5b4ec082f175445482165de0fe191cc145d62'

    let apiURL = baseURL + censusVariable + county + state + key
    console.log('APP apiURL:', apiURL)

    const usaCountyJSON =  'https://gist.githubusercontent.com/mendozaline/d9023583f18de57b8a9a71ce46c44400/raw/21945be2fa914b1a9aafa1d8ab8f9c65217cda85/us-counties.json'

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

          //add county, state property
          //console.log('APP apiData:', apiData)
          let countyState = apiData[i][0]
          //console.log('APP countyState:', countyState)

          for (var j = 0; j < usaJSON.features.length; j++) {
            //from geoJSON
            let jsonCountyFIP = usaJSON.features[j].properties.COUNTYFP
            let jsonStateFIP = usaJSON.features[j].properties.STATEFP
            let jsonCountyCode = jsonCountyFIP + ':' + jsonStateFIP

            if (apiCountyCode === jsonCountyCode) {
              usaJSON.features[j].properties.apiValue = percent
              usaJSON.features[j].properties.countyState = countyState
              break
            }
          }

        } //end for loops

        cmp.setState({
          apiJSON: usaJSON.features,
        }) //end setState
    }) //end await
  } //end callAPI

  receiveCensusVariable(censusVar) {
    console.log('APP censusVar', censusVar)

    console.log('this.state.cenVarB:', this.state.censusVariable)
    this.setState({
      censusVariable: censusVar
    })
    console.log('this.state.cenVarA:', this.state.censusVariable)
  }

  visualizeClick() {
    //console.log('APP ddc censusVar: ', this.state.censusVariable)
    console.log('click API')
    this.callAPI()
  }

  render() {

    console.log('APP apiJSON:', this.state.apiJSON)
    console.log('APP cenVar:', this.state.censusVariable)

    return (
      <div>
        <h1>Census Data Visualizer</h1>
        <br />
        <h3>Visualize the data!</h3>
        <br />
        <Dropdown receiveVar={this.receiveCensusVariable}/>
      </div>
    ) //end return
  } //end render
} //end App

export default App;
