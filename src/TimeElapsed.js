import React, { Component } from 'react';

import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
import DataSet from '@antv/data-set';

import TimeElapsedString from './TimeElapsedString'
// import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'

class TimeElapsed extends Component {
  constructor(props) {
    super(props)
    this.state ={
      timeElapsed: '00:00.00'
    }
  }

  componentDidMount() {
    var _this = this

    // set an interval to update time elapsed label
    if (_this.props.profile.testBeganAt != null)
      setInterval(function() {
        let timeStarted = _this.props.profile.testBeganAt
        let timeEnded = (_this.props.profile.testEndedAt == null) ? new Date() :  _this.props.profile.testEndedAt

        let timeElapsedString = TimeElapsedString(timeStarted, timeEnded)

        _this.setState({timeElapsed: timeElapsedString})
      }, 40)

  }
  render() {
    return (<h1 style={{textAlign:'center', marginTop: '-.5em'}}>
              {this.state.timeElapsed}</h1>);
  }

}

//https://github.com/alibaba/BizCharts/blob/master/doc_en/api/axis.md
export default TimeElapsed
