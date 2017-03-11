import React from 'react'

const renderPaths = (props) => {
  console.log('PATH props:', props)
//  console.log('PATH props.json:', props.json)

  return (stateObj, index) => {
//    console.log('stateObjPro:', stateObj.properties)

    let strokeColor = null
    if (stateObj.properties.name === 'Yucatan') {
      strokeColor = 'limeGreen'
    } else if (stateObj.properties.name === 'Sonora') {
      strokeColor = 'indigo'
    } else {
      strokeColor = 'silver'
    }

    const pathProps = {
      d: props.path(stateObj),
      fill: props.color(stateObj.properties.homicide),
      stroke: strokeColor,
      opacity: 1.0,
      key: index,
    }

    return (
      <path {...pathProps} >
        <title>
          {stateObj.properties.name}: {stateObj.properties.homicide}
        </title>
      </path>
    )
  }
} //end renderPaths

export default (props) => {
  if (!props.json) {
    return <p>Loading...</p>
  }

  console.log('PATH props.json:', props.json)

  return (
    <g>
      { props.json.map(renderPaths(props)) }
    </g>
  )
}
