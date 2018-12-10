import React, { Component } from 'react';
import logo from './logo.svg';
import { graphql, compose, Query } from 'react-apollo'
import Nav from './Nav'

import {ALL_PATIENTS} from './patient'

class PatientList extends Component {
  // constructor(props) {
  //   super(props)
  //   }
  // }

  render() {
    let _this = this

    return (
      <div>
        <div class="sticky-top header"> 
        <h1 class="sticky-top">Patients</h1>
        </div>
        <div class="list-group list-group-flush">
          <Query query={ALL_PATIENTS} pollInterval={5000}>
            {({ loading, error, data }) => {
              if (loading) return (<div class="spinner-overlay">
                    <div class="spinner center">
                      <div class="spinner-blade"></div>
                      <div class="spinner-blade"></div>
                      <div class="spinner-blade"></div>
                      <div class="spinner-blade"></div>
                      <div class="spinner-blade"></div>
                      <div class="spinner-blade"></div>
                      <div class="spinner-blade"></div>
                      <div class="spinner-blade"></div>
                      <div class="spinner-blade"></div>
                      <div class="spinner-blade"></div>
                      <div class="spinner-blade"></div>
                      <div class="spinner-blade"></div>
                    </div>
                  </div>);
              if (error) return <div>`Error! ${error.message}`</div>;
              return (
                  data.allPatients.map(patient => {
                    let createdAt = new Date(Date.parse(patient.createdAt)).toLocaleString()

                    return (
                      <a href={"/patient/"+patient.id+(window.location.pathname.includes('api') ? '/api' : '')} class="list-group-item list-group-item-action">
                        {patient.name || patient.hospitalID || '...'}
                        <span class="badge badge-pill badge-primary float-right">{patient.profiles.length} Profiles</span>
                      </a>
                    )
                  })
                )
            }}
          </Query>
        </div>
      </div>
    );
  }

}

//https://github.com/alibaba/BizCharts/blob/master/doc_en/api/axis.md
export default PatientList
