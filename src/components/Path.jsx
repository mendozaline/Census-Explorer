import React from 'react'
import * as d3 from 'd3'
import PathCounties from './PathCounties.jsx'

export default (props) => {
  console.log('PATH props:', props)
  //console.log('PATH props.apiJSON:', props.apiJSON)

  return (
    <g>
      {
        props.apiJSON.map( (stateObj, index) => {
          //console.log('i', index)

          let strokeColor = null
          if (stateObj.properties.countyState === 'Harney County, Oregon') {
            strokeColor = 'limeGreen'
          } else {
            strokeColor = 'gainsboro'
          }

          let fillColor = null
          if (isNaN(stateObj.properties.apiValue)) {
            fillColor = 'black'
          } else {
            fillColor = props.color(stateObj.properties.apiValue)
          }

          let tooltipOn = function(event) {
            //console.log('name: ', stateObj.properties.NAME)
            //console.log('apiValue: ', stateObj.properties.apiValue)
            //console.log('pageX:', event.pageX)
            //console.log('index:', index)

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

          let centered;
          let zoomIn = function() {
            //console.log('p', props.path.centroid(stateObj))
            console.log('PATH i', index)

            let x, y, k
            //if clicked county not prev. clicked
            if (stateObj && centered !== stateObj) {
              console.log('zoom IN!')
              //console.log('PATHG stateObj', stateObj)
              //console.log('PATHG ccentered', centered)

              let centroid = props.path.centroid(stateObj)
              let b = props.path.bounds(stateObj)
              //console.log('PATHG bounds', b)
              x = centroid[0]
              y = centroid[1]
              k = 0.8 / Math.max((b[1][0] - b[0][0]) / props.width,
                                 (b[1][1] - b[0][1]) / props.height)
              centered = stateObj
            } else {
              console.log('zoom OUT!')
              x = props.width / 2
              y = props.height / 2
              k = 1
              centered = null
            }

//            d3.select(stateObj)
//              .classed('highlight')
//              .classed('active', function(stateObj) {
//              //console.log('classed cent', centered)
//              return stateObj !== centered;
//            })
//              .style('stroke', 'crimson')
//              .style('fill', function() {
//              //console.log('if stObj': stateObj)
//              if (stateObj === stateObj) {
//                //console.log('yes!')
//                return 'dodgerBlue';
//              } else {
//                return 'crimson'
//              }
//            })

            d3.selectAll('path')
              //.transition()
              //.duration(500)
              .attr('transform', 'translate(' + props.width / 2 + ',' + props.height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')
              .style('stroke-width', 0.75 / k + 'px');

          } //end zoom

          const pathProps = {
            d: props.path(stateObj),
            fill: fillColor,
            stroke: strokeColor,
            strokeWidth: 0.75,
            key: index,
            onMouseOver: tooltipOn,
            onMouseLeave: tooltipOff,
            onClick: zoomIn,
          }

          return (
            <PathCounties
              {...pathProps} />
          )
        })
      }
    </g>
  ) //end return
} //end Path Counties
