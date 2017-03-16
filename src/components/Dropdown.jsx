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
    }
  }

  dropdownSelect(event) {
    event.preventDefault()
    console.log('APP dds evt.target.value:', event.target.value)
    this.setState({
      censusVariable: event.target.value
    })
    console.log('DROP S censusVar:', this.state.censusVariable)
  }

  dropdownClick() {
    console.log('DROP click')
    console.log('DROP C censusVar:', this.state.censusVariable)
    this.props.receiveVar(this.state.censusVariable)
  }

  render() {
//    console.log('DROPDOWN props', this.props)

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

    return(
      <VariableSelect>
        <Select
          value={this.state.censusVariable}
          onChange={this.dropdownSelect} >
          {censusVarDropdown}
        </Select>

        <Button
          type='submit'
          value='Select'
          onClick={this.dropdownClick} />
      </VariableSelect>
    )
  }
}
