import React from 'react'
import * as d3 from 'd3'
import Path from './Path.jsx'

var projection = d3.geoConicConformal()
  .rotate([98, 0])
  .center([0, 25])
  .parallels([29.5, 45.5])
  .scale(1250)
  .translate([500, 225])
  .precision(.1)

var path = (props) => {
//  console.log('MAP props:', props)
  return d3.geoPath().projection(projection)
}

var color = (props) => {
  return d3.scaleQuantize()
    .domain([0, 189])
    .range([ "#fff5f0", "#fee0d2", "#fcbba1",
            "#fc9272", "#fb6a4a", "#ef3b2c",
            "#cb181d", "#a50f15", "#67000d",
           ])
}

export default (props) => {
  const scales = {
    color: color(props),
    path: path(props),
  }

//  console.log('MAP props', props)

  return (
    <svg width={props.width} height={props.height}>
      <Path {...props} {...scales} />
    </svg>
  )
}
