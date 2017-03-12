import React from 'react'

const renderPaths = (props) => {
//  console.log('PATH props:', props)
  return (stateObj, index) => {
//    console.log('PATH stateObj.prop:', stateObj.properties)

    let strokeColor = null
    if (stateObj.properties.NAMELSAD === 'Imperial County') {
      strokeColor = 'limeGreen'
    } else {
      strokeColor = 'gainsboro'
    }

    let strokeWidth = null
    if (stateObj.properties.NAMELSAD === 'Imperial County') {
      strokeWidth = 1.5
    } else {
      strokeWidth = .75
    }

    let fillColor = null
    if (isNaN(stateObj.properties.apiValue)) {
      fillColor = 'black'
    } else {
      fillColor = props.color(stateObj.properties.apiValue)
    }

    const pathProps = {
      d: props.path(stateObj),
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      key: index,
    }

    return (
      <path {...pathProps} >
        <title>
          {stateObj.properties.NAMELSAD}: {stateObj.properties.apiValue}
        </title>
      </path>
    )
  }
} //end renderPaths

export default (props) => {
//  console.log('PATH props.apiJSON:', props.apiJSON)

  return (
    <g>
      { props.apiJSON.map(renderPaths(props)) }
    </g>
  )
}
