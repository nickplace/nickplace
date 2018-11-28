import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

export default class Nav extends Component {
	render() {
		return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <NavLink to="/patients" className="nav-item nav-link" activeClassName="active">Patients</NavLink>
            <NavLink to="/profiles" className="nav-item nav-link" activeClassName="active">Profiles</NavLink>
          </ul>

        </div>
        <a class="navbar-brand" href="#">
          <img src="ifirst.png" width="30" height="30"/>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
    )
  }
}
