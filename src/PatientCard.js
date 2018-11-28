import React, { Component } from 'react';
import logo from './logo.svg';
import { graphql, compose, Query } from 'react-apollo'

import TimeElapsed from './TimeElapsed'
import TimeElapsedString from './TimeElapsedString'
import ProfileChart from './ProfileChart'

import {GET_PATIENT, UPDATE_PATIENT_MUTATION} from './patient'

class PatientCard extends Component {
  constructor(props) {
    super(props)
  }

  deletePatient(id) {
    let confirmed = window.confirm("Are you sure that you want to archive this patient?");
    if (confirmed) {
      this.props.updatePatientMutation({variables:{patientId: id, isArchived:true}})
    }
  }

  render() {
    let _this = this

    if (this.props.patientId == null) {
      return (
        <div class="card patient-card">
          <div class="card-body">
            <h5 class="card-title">Unnamed Patient</h5>
          </div>
        </div>
      )
    } else {
      return (
        <Query query={GET_PATIENT} variables={{ id:  _this.props.patientId }} pollInterval={1000}>
          {({ loading, error, data }) => {
            if (loading) {
              return (<div class="spinner-overlay">
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
            } else {
              let { id, isArchived, hospitalID, name, bloodType, dateOfBirth, ethnicity, profiles, createdAt, updatedAt} = data.patient
              let archivedBadge = (isArchived == true) ? 
              (<span className={"badge badge-pill float-right badge-info"}>
                Archived
              </span>) : null

              return (
                <div class="card patient-card">
                  <div class="card-body">
                    <h5 class="card-title">{name}{archivedBadge}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{hospitalID}</h6>
                      <table class="table">
                        <tbody>
                          <tr scope="row"><th>Date of Birth:</th> <td> {dateOfBirth || '..'}</td></tr>
                          <tr scope="row"><th>Blood Type:</th> <td> {bloodType || '..'}</td></tr>
                          <tr scope="row"><th>Ethnicity:</th> <td> {ethnicity || '..'}</td></tr>
                          <tr scope="row"><th>Updated At:</th> <td> {updatedAt || '..'}</td></tr>
                        </tbody>
                      </table>

                      <hr />
                      <div class="text-right">
                        <a href="#" class="card-link text-danger" onClick={() => {
                          _this.deletePatient(id) }}>Delete</a>
                      </div>
                  </div>
                </div>
              )
            }
          }}
        </Query>
      );
    }
  }
}

//https://github.com/alibaba/BizCharts/blob/master/doc_en/api/axis.md
export default compose(
  graphql(UPDATE_PATIENT_MUTATION, {name: 'updatePatientMutation'}))
(PatientCard)

