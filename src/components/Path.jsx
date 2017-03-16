import React from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

const Path = styled.path`
  &:hover {
    stroke: dodgerBlue;
    stroke-width: 5.5px;
  }
`

const renderPaths = (props) => {
  //console.log('PATH props:', props)
  return (stateObj, index) => {
    //console.log('PATH stateObj.prop:', stateObj.properties)

    let strokeColor = null
    if (stateObj.properties.NAME === 'Coconino') {
      strokeColor = 'gainsboro'
    } else {
      strokeColor = 'gainsboro'
    }

    let strokeWidth = null
    if (stateObj.properties.NAME === 'Coconino') {
      strokeWidth = .75
    } else {
      strokeWidth = .75
    }

    let fillColor = null
    if (isNaN(stateObj.properties.apiValue)) {
      fillColor = 'white'
    } else {
      fillColor = props.color(stateObj.properties.apiValue)
    }

    let tooltipOn = function(event) {
      //console.log('name: ', stateObj.properties.NAME)
      //console.log('apiValue: ', stateObj.properties.apiValue)
      //console.log('pageX:', event.pageX)

      let pageXAdjustment = null
      if (event.pageX > 450) {
        pageXAdjustment = event.pageX - 250
      } else {
        pageXAdjustment = event.pageX + 45
      }

      d3.select('#tooltip')
        .style('left', pageXAdjustment + 'px')
        .style('top', (event.pageY - 45) + 'px')

      d3.select('#value1')
        .text(stateObj.properties.countyState)

      d3.select('#value2')
        .text(stateObj.properties.apiValue)

      d3.select('#tooltip').classed('hidden', false);
    } //end tooltipOn

    let tooltipOff = function() {
      d3.select('#tooltip').classed('hidden', true);
    } //end tooltipOff

    const pathProps = {
      d: props.path(stateObj),
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      key: index,
      onMouseOver: tooltipOn,
      onMouseLeave: tooltipOff,
      className: 'counties',
    }

    return (
      <Path {...pathProps} >
        {/* <title>
          {stateObj.properties.NAME} County: {stateObj.properties.apiValue}
        </title> */}
      </Path>
    )
  }
} //end renderPaths

export default (props) => {
  console.log('PATH props.apiJSON:', props.apiJSON)

  return (
    <g>
      { props.apiJSON.map(renderPaths(props)) }
    </g>
  )
}
