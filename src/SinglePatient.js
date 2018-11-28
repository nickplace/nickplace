import React, { Component } from 'react';
import logo from './logo.svg';
import { graphql, compose, Query } from 'react-apollo'

import PatientCard from './PatientCard'
import PatientProfiles from './PatientProfiles'

import {GET_PATIENT} from './patient'

class SinglePatient extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let _this = this

    return (
      <div class="patient-page">
        <div class="col-md-5">
          <a class="btn btn-link" href={"/patients"+(window.location.pathname.includes('api') ? '/api' : '')}>← All Patients</a>
          <PatientCard patientId={_this.props.match.params.id } />
        </div>
        <div class="col-md-7">
          <PatientProfiles patientId={_this.props.match.params.id} />
        </div>
      </div>
    );
  }
}

//https://github.com/alibaba/BizCharts/blob/master/doc_en/api/axis.md
export default SinglePatient
