import React, { Component } from 'react';
import logo from './logo.svg';
import { graphql, compose, Query } from 'react-apollo'

import TimeElapsed from './TimeElapsed'
import TimeElapsedString from './TimeElapsedString'
import ProfileChart from './ProfileChart'

import PatientCard from './PatientCard'

import {GET_PROFILE} from './profile'

class SingleProfile extends Component {
  constructor(props) {
    super(props)
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

              let statusText = (profile.status < 2) ? "In Progress" : "Completed"
              let statusClass = (profile.status < 2) ? "badge-info" : "badge-success"

              let patientName = (patient == null) ? "Unnamed Patient" : patient.name
              let testBeganAt = profile.testBeganAt == null ? "Waiting..." : new Date(Date.parse(profile.testBeganAt)).toLocaleString()
              let source = profile.videoName == null ? "Back-Facing Camera" : profile.videoName

              let Tr = profile.rOscillation == null ? "..." : TimeElapsedString(profile.rOscillation.maxDate)
              let Tk = profile.kOscillation == null ? "..." : TimeElapsedString(profile.kOscillation.maxDate - profile.rOscillation.maxDate)
              let alpha = profile.alphaAngle == null ? "..." : profile.alphaAngle.toFixed(3) + 'º'
              let ma = profile.maOscillation == null ? "..." : profile.maOscillation.coagulationIndex.toFixed(3) + ' mm'
              let ly30ratio = profile.ly30Ratio == null ? "..." : (profile.ly30Ratio * 100).toFixed(3) + '%'

              return (
                <div class="profile-page">
                  <div class="col-md-7">
                    <a class="btn btn-link" href={"/profiles"+(window.location.pathname.includes('api') ? '/api' : '')}>← All Profiles</a>
                    <div className="card profile-card">
                      <div className="card-header text-center">
                        <h5 className="card-title">{patientName}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{testBeganAt}</h6>
                      </div>
                      <div className="card-body">
                        <div id="chart" style={{width:'100%', textAlign: 'center', overflow:'scroll'}}>
                          <div style={{height:250}}>
                            <ProfileChart profile={profile} />
                          </div>
                        </div>

                        <div>
                          <TimeElapsed profile={profile} />
                          <h5 style={{textAlign:'center'}}>
                            <span className={"badge badge-pill " + statusClass}>
                              Test Status: {statusText}
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div class="card-footer">
                        {this.paramJsx('T(r)', Tr)}
                        {this.paramJsx('T(k)', Tk)}
                        {this.paramJsx('alpha', alpha)}
                        {this.paramJsx('MA', ma)}
                        {this.paramJsx('LY30', ly30ratio)}

                        <hr />
                        {this.detailJsx('Source', source)}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <h3>Patient</h3>
                    <PatientCard patientId={patient != null ? patient.id : null} />
                  </div>
                </div>

            )
          }}
        </Query>
    );
  }

  paramJsx(label, value) {
    return (
      <div className="row">
        <div class="col-4 text-right">{label}</div>
        <div class="col"><strong>{value}</strong></div>
      </div>
      );
  }

  detailJsx(label, value) {
    return (
      <div className="row">
        <div class="col-4 text-right">{label}</div>
        <div class="col"><strong>{value}</strong></div>
      </div>
      );
  }
}

//https://github.com/alibaba/BizCharts/blob/master/doc_en/api/axis.md
export default SingleProfile
