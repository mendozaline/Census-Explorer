import React, { Component } from 'react'
import styled from 'styled-components'

const VariableSelect = styled.div`
//  border: 1px solid crimson;
  margin: auto;
  max-width: 1000px;
  text-align: center;
  width: 90%;
`

const Select = styled.select`
  display: block;
  margin: auto;
  width: 50%;
`

const Button = styled.input`
  display: block;
  margin: auto;
`

export default class Dropdown extends Component {
  constructor(props) {
    super(props)

    this.dropdownSelect = this.dropdownSelect.bind(this)
    this.dropdownClick = this.dropdownClick.bind(this)

    this.state = {
      censusVariable: '',
      stateVariable: '',
    }
  }

  dropdownSelect(event) {
    event.preventDefault()
    let name = event.target.name
    let value = event.target.value
    console.log('DROP SELECT ' + name + ': ' + value)

    this.setState({
      [name]: value
    })
  }

  dropdownClick() {
    console.log('DROP state:', this.state)

    this.props.callAPI(this.state.censusVariable, this.state.stateVariable)
  }

  render() {
//    console.log('DROPDOWN props', this.props)

    const censusVarCodes = [
      {name: 'variable (required)', varCode: ''},
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

    const stateVarCodes = [
      {name: 'state (optional)', varCode: ''},
      {name: 'Oregon', varCode: '41'},
      {name: 'Alabama', varCode: '01'},
      {name: 'Alaska', varCode: '02'},
      {name: 'Arizona', varCode: '04'},
      {name: 'Arkansas', varCode: '05'},
      {name: 'California', varCode: '06'},
      {name: 'Colorado', varCode: '08'},

    ]

    let censusVarDropdown = censusVarCodes.map((cenVarObj, index) => {
      //console.log('APP cenVarObj', cenVarObj)
      return (
        <option key={index} value={cenVarObj.varCode}>
          {cenVarObj.name}
        </option>
      )
    })

    let stateVarDropdown = stateVarCodes.map((stVarObj, index) => {
      //console.log('APP stVarObj', stVarObj)
      return (
        <option key={index} value={stVarObj.varCode}>
          {stVarObj.name}
        </option>
      )
    })

    return(
      <div>
        <VariableSelect>
          <Select
            value={this.state.censusVariable}
            name={'censusVariable'}
            onChange={this.dropdownSelect} >
            {censusVarDropdown}
          </Select>

          <Select
            value={this.state.stateVariable}
            name={'stateVariable'}
            onChange={this.dropdownSelect} >
            {stateVarDropdown}
          </Select>

        </VariableSelect>

        <Button
          type='submit'
          value='Select'
          onClick={this.dropdownClick} />
      </div>
    )
  }
}
