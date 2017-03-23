import React, { Component } from 'react'
import styled from 'styled-components'

const Path = styled.path`
  &:hover {
    stroke: dodgerBlue;
    stroke-width: 5.5px;
  }
`

export default class PathCounties extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
//    console.log('COUNTIES props', this.props)

    return (
      <Path {...this.props} >
        {/* <title>
          {stateObj.properties.NAME} County: {stateObj.properties.apiValue}
        </title> */}
      </Path>
    )

  }
}
