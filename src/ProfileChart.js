import React, { Component } from 'react';
import logo from './logo.svg';

import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';
import TimeElapsedString from './TimeElapsedString';
// import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

class ProfileChart extends Component {
  constructor(props) {
    super(props)

    let ds = new DataSet();

    props.profile.oscillations.map(oscillation => {
      let half = oscillation.coagulationIndex/2
      oscillation.coagulationIndex = [half, -half]
      return oscillation
    });

    let dv = ds.createView().source(props.profile.oscillations);
    dv.transform({
      type: 'fold',
      // fields: [ 'minAngle', 'maxAngle' ], // 展开字段集
      fields: [ 'coagulationIndex' ], // 展开字段集
      key: 'time', // key字段
      value: 'ci', // value字段
    }); 

    this.state = {
      dv: dv
    }
  }

  componentDidMount() {
    setTimeout(function() {
      document.getElementById("chart").scrollLeft = 1000000;
    }, 200)
  }

  static getDerivedStateFromProps(nextProps, prevState){
    let oscillations = nextProps.profile.oscillations
    oscillations.map(oscillation => {
      if (typeof(oscillation.coagulationIndex) != 'object') {
        let half = oscillation.coagulationIndex/2
        oscillation.coagulationIndex = [half, -half]
      }
      return oscillation
    });

    console.log(oscillations)
    return {dv: prevState.dv.source(oscillations)}
  }

  render() {

    let colsDateScale = {};
    let colsAngleScale = {};
    if (this.props.profile.oscillations.length > 0) {
      var lastOscillation = this.props.profile.oscillations[this.props.profile.oscillations.length-1]
      var firstOscillation = this.props.profile.oscillations[(this.props.profile.oscillations.length > 1) ? 1 : 0]

      colsDateScale = {
        max: lastOscillation.maxDate, 
        min: lastOscillation.maxDate - 3200000,
        tickInterval: 160000,
        nice: false
      }
      // colsAngleScale = {max: firstOscillation.maxAngle + .1, min: firstOscillation.minAngle - .1}
      colsAngleScale = {max: 40, min: -40}
    }

    let cols = {
      ci: colsAngleScale,
      maxDate: colsDateScale
    }

    return   (   
      <Chart 
        padding={[30,55,20,50]} 
        height={200} 
        width={2000} 
        data={this.state.dv} 
        scale={cols} >

        <Axis
          name="ci"
          position="right"
          label={
            {
              formatter: val => `${val} mm`,
              textStyle:{fill:"#000"}
            }
          }
          grid={
            {lineStyle:{
              stroke:"#ccc"}
            }
          }/>

        <Axis
          name="maxDate"
          position="bottom"
          label={
            {
              formatter: val => TimeElapsedString(parseInt(val)),
              textStyle:{fill:"#000"}
            }
          }
          grid={
            {lineStyle:{
              stroke:"#ccc", 
              lineDash: [4, 4]}
            }
          }/>


        <Tooltip crosshairs={{type : "y"}}/>
        <Geom type="line" position="maxDate*ci" size={2} color={'time', ['#007bff', '#007bff']}/>
      
      </Chart>
    )
  }
}

//https://github.com/alibaba/BizCharts/blob/master/doc_en/api/axis.md
export default ProfileChart
