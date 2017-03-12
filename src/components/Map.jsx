import React from 'react'
import * as d3 from 'd3'
import Path from './Path.jsx'

var projection = d3.geoConicConformal()
  .rotate([98, 0])
  .center([11, 40])
  .parallels([29.5, 45.5])
  .scale(1000)
  .translate([500, 225])
  .precision(.1)

var path = (props) => {
  console.log('MAP props:', props)
  return d3.geoPath().projection(projection)
}

var findMin = (data) => {
  return d3.min(data, (d) => {
//    console.log(d.properties.value)
    return d.properties.value
  })
}

var findMax = (data) => {
  return d3.max(data, (d) => {
//    console.log(d.properties.value)
    return d.properties.value
  })
}

var color = (props) => {
//  console.log('min:', findMin(props.json))
//  console.log('max:', findMax(props.json))
  return d3.scaleQuantize()
    .domain([
      findMin(props.json),
      findMax(props.json)
    ])
    .range(['#feebe2','#fbb4b9','#f768a1','#ae017e'])
}

export default (props) => {
  if (props.data2 === null) {
    return <p>Loading...</p>
  }

  const scales = {
    color: color(props),
    path: path(props),
  }

  console.log('MAP props', props)

  return (
    <svg width={props.width} height={props.height}>
      <Path {...props} {...scales} />
    </svg>
  )
}
