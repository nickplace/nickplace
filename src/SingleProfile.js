import React, { Component } from 'react';
import logo from './logo.svg';
import { graphql, compose, Query } from 'react-apollo'

import TimeElapsed from './TimeElapsed'
import TimeElapsedString from './TimeElapsedString'
import ProfileChart from './ProfileChart'

import PatientCard from './PatientCard'

import {GET_PROFILE, UPDATE_PROFILE_MUTATION} from './profile'

class SingleProfile extends Component {
  constructor(props) {
    super(props)
    // this.props.updateProfileMutation({variables:{profileId: this.props.match.params.id, isArchived:false}})
  }

  deleteProfile(id) {
    let confirmed = window.confirm("Are you sure that you want to archive this profile?");
    if (confirmed) {
      this.props.updateProfileMutation({variables:{profileId: id, isArchived:true}})
    }
  }

  render() {
    let _this = this

    return (
          <Query query={GET_PROFILE} variables={{ id:  _this.props.match.params.id }} pollInterval={1000}>
            {({ loading, error, data }) => {
              if (loading) return (
                  <div class="spinner-overlay">
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
              if (error) return (
                  <div>
                      {error.message}
                  </div>);

              let profile = data.profile
              let patient = data.patient

              let statuses = ['New', 'In progress', 'Completed', 'Errored']
              let statusClasses = ['badge-secondary', 'badge-info', 'badge-success', 'badge-danger']
              let statusText = statuses[profile.status]
              let statusClass = statusClasses[profile.status]

              let patientName = (patient == null) ? "Unnamed Patient" : patient.name
              let testBeganAt = profile.testBeganAt == null ? "..." : new Date(Date.parse(profile.testBeganAt)).toLocaleString()
              let testEndedAt = profile.testEndedAt == null ? "..." : new Date(Date.parse(profile.testEndedAt)).toLocaleString()
              let createdAt = profile.createdAt == null ? "..." : new Date(Date.parse(profile.createdAt)).toLocaleString()
              let cartridgeInsertedAt = profile.cartridgeInsertedAt == null ? "..." : new Date(Date.parse(profile.cartridgeInsertedAt)).toLocaleString()
              let bloodInjectedAt = profile.bloodInjectedAt == null ? "..." : new Date(Date.parse(profile.bloodInjectedAt)).toLocaleString()
              let source = profile.videoName == null ? "Back-Facing Camera" : profile.videoName

              let Tr = profile.rOscillation == null ? "..." : TimeElapsedString(profile.rOscillation.maxDate)
              let TrDate = profile.rOscillation == null ? "..." : TimeElapsedString(profile.rOscillation.maxDate)
              let Tk = profile.kOscillation == null ? "..." : TimeElapsedString(profile.kOscillation.maxDate - profile.rOscillation.maxDate)
              let TkDate = profile.kOscillation == null ? "..." : TimeElapsedString(profile.kOscillation.maxDate)
              let alpha = profile.alphaAngle == null ? "..." : profile.alphaAngle.toFixed(3) + 'º'
              let ma = profile.maOscillation == null ? "..." : profile.maOscillation.coagulationIndex.toFixed(3) + ' mm'
              let maDate = profile.maOscillation == null ? "..." : TimeElapsedString(profile.maOscillation.maxDate)
              let ly30ratio = profile.ly30Ratio == null ? "..." : (profile.ly30Ratio * 100).toFixed(3) + '%'
              let ly30Date = profile.ly30Oscillation == null ? "..." : TimeElapsedString(profile.ly30Oscillation.maxDate)

              let archivedBadge = (profile.isArchived == true) ? 
                (<span className={"badge badge-pill float-right badge-info"}>
                  Archived
                </span>) : null
              return (
                <div class="profile-page">
                  <div class="col-md-7">
                    <a class="btn btn-link" href={"/profiles"+(window.location.pathname.includes('api') ? '/api' : '')}>← All Profiles</a>
                    {archivedBadge}
                    <div className="card profile-card">
                      <div className="card-header text-center">
                        <h5 className="card-title">{patientName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{testBeganAt}</h6>
                      </div>
                      <div className="card-body">
                        <div id="chart">
                          <div style={{height:250}}>
                            <ProfileChart profile={profile} />
                          </div>
                        </div>

                        <div>
                          <TimeElapsed profile={profile} />
                          <h4 style={{textAlign:'center', margin:'-.6em 0 0'}}>
                            <span className={"badge " + statusClass}>
                              {statusText}
                            </span>
                          </h4>
                        </div>
                      </div>
                      <div class="card-footer">
                        {this.paramJsx('T(r)', Tr)}
                        {this.paramJsx('T(k)', Tk, TkDate)}
                        {this.paramJsx('alpha', alpha)}
                        {this.paramJsx('MA', ma, maDate)}
                        {this.paramJsx('LY30', ly30ratio, ly30Date)}
                        <strong>Events</strong>
                        <hr/>
                        {this.detailJsx('Initialized', createdAt)}
                        {this.detailJsx('Inserted cartridge', cartridgeInsertedAt)}
                        {this.detailJsx('Injected blood', bloodInjectedAt)}
                        {this.detailJsx('Test Began', testBeganAt)}
                        {this.detailJsx('Test Ended', testEndedAt)}
                        <strong>Information</strong>
                        {this.detailJsx('Source', source)}

                        <div class="text-right">
                          <a href="#" class="card-link text-danger" onClick={() => {
                            _this.deleteProfile(profile.id)
                          }}>Archive</a>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <PatientCard patientId={patient != null ? patient.id : null} />
                  </div>
                </div>

            )
          }}
        </Query>
    );
  }

  paramJsx(label, value, timestamp) {
    return (
      <div className="row">
        <div class="col-3">
          <h5>{label}</h5>
        </div>
        <div class="col-5 text-right">
          <span class="text-muted">Value</span><br/>
          {timestamp != null ? <span class="text-muted">Timestamp</span> : null}
        </div>
        <div class="col-4" style={{fontWeight:700}}>
          {value}<br/>
          {timestamp}
        </div>

        <div class="col-12">
          <hr/>
        </div>
      </div>
      );
  }

  detailJsx(label, value) {
    return (
      <div className="row">
        <div class="col-4 text-right">
          <span class="text-muted">{label}</span><br/>
        </div>
        <div class="col-8">
          {value}
        </div>
        <div class="col-12">
          <hr/>
        </div>
      </div>
      );
  }
}

//https://github.com/alibaba/BizCharts/blob/master/doc_e...pi/axis.md
export default compose(
  graphql(UPDATE_PROFILE_MUTATION, {name: 'updateProfileMutation'}))
(SingleProfile)
