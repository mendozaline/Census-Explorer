import React from 'react'
import * as d3 from 'd3'
import Path from './Path.jsx'

let path = (props) => {
  //console.log('MAP props:', props)
  //console.log('MAP props w:', props.width)
  return d3.geoPath().projection(
    d3.geoConicConformal()
      .rotate([98, 0])
      .center([15, 24]) //l↑ r↓  u↓ d↑
      .parallels([29.5, 45.5])
      .scale(props.width * 1.7)  //↑b
      .translate([props.width, props.height])
      .precision(.1)
  )
}

let findMin = (data) => {
  return d3.min(data, (d) => {
    //console.log(MAP d.properties.apiValue)
    return d.properties.apiValue
  })
}

let findMax = (data) => {
  return d3.max(data, (d) => {
    //console.log(MAP d.properties.apiValue)
    return d.properties.apiValue
  })
}

let color = (props) => {
  console.log('MAP min:', findMin(props.apiJSON))
  console.log('MAP max:', findMax(props.apiJSON))
  return d3.scaleQuantize()
    .domain([
      findMin(props.apiJSON),
      findMax(props.apiJSON)
    ])
    .range(['#fff7f3','#fde0dd','#fcc5c0',
            '#fa9fb5','#f768a1','#dd3497',
            '#ae017e','#7a0177','#49006a'])
}

export default (props) => {
  if (props.apiJSON === null) {
    return (
      <div>
        <br />
        <h4>Waiting for a variable selection...</h4>
      </div>
    )
  }

  const scales = {
    color: color(props),
    path: path(props),
  }

  console.log('MAP props', props)

  return (
    <div>
      <div id='tooltip' className='hidden'>
        <p>
          County: <span id='value1'></span>
          <br/>
          Value: <span id='value2'></span>
        </p>
      </div>

      <svg width={props.width} height={props.height}>
        <Path {...props} {...scales} />
      </svg>
    </div>
  )
}
