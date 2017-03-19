import React from 'react'
import * as d3 from 'd3'
import G from './Path.jsx'
import styled from 'styled-components'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

const Svg = styled.svg`
//  border: 1px solid crimson;
  margin: auto;
  width: 99%;
`
const TooltipMain = styled.div`
  border-radius: 5px;
  box-shadow: 1px 1px 5px gray;
  background-color: white;
  opacity: 1.0;
  position: absolute;
  pointer-events: none;
  height: auto;
  width: auto;
`
const TooltipText = styled.p`
  font-family: sans-serif;
  font-size: 15px;
  margin-left: 5px;
`

let path = (props) => {
  //console.log('MAP props:', props)
  //console.log('MAP props w:', props.width)
  return d3.geoPath().projection(
    d3.geoConicConformal()
      .rotate([98, 0])
      .center([14.25, 22.25]) //l↑ r↓  u↓ d↑
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
    console.log('MAP apiJSON', props.apiJSON)
    return null
  }

  const scales = {
    color: color(props),
    path: path(props),
  }

  console.log('MAP props', props)

  const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  ]

  return (
    <div>
      <TooltipMain id='tooltip' className='hidden'>
        <TooltipText>
          Name: <span id='value1'></span>
          <br/>
          Value: <span id='value2'></span>
        </TooltipText>

        <LineChart
          width={300}
          height={150}
          data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}} >
          <XAxis dataKey="name"/>
          <YAxis/>
          <CartesianGrid strokeDasharray="3 3"/>
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="dodgerBlue" activeDot={{r: 8}}/>
          <Line type="monotone" dataKey="uv" stroke="crimson" />
        </LineChart>

      </TooltipMain>

      <Svg width={props.width} height={props.height}>
        <G {...props} {...scales} />
      </Svg>
    </div>
  )
}
