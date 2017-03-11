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

var xMin = (data) => {
  return d3.min(data, (d) => {
//    console.log(d[1])
    return parseInt(d[1],10)
  })
}

var xMax = (data) => {
  return d3.max(data, (d) => {
//    console.log(parseInt(d[1],10))
    return parseInt(d[1],10)
  })
}

var color = (props) => {
  return d3.scaleThreshold()
    .domain([xMin(props.data2), xMax(props.data2)])
    .range(['#fff7f3','#fde0dd','#fcc5c0',
            '#fa9fb5','#f768a1','#dd3497',
            '#ae017e','#7a0177','#49006a'])
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
