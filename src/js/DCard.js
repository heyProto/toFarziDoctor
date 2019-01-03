import React, { Component } from 'react';
import '../css/DCard.css'

class DCard extends Component {

  constructor() {
    super();
  }

  render() {
    let data = this.props.data
    let count = this.props.count
    return (
        <div className="card">
          <div className="content">
            <div className="header">
              <div className="tag">
              Matches found: {count}
              </div>
            </div>
            <div className="drname">
              <div className="drname-text">
                {data.name}
              </div>
            </div>
            <div className="reg">
              <div className="reg-no">
                <div className="label">
                  Registration no.
                </div>
                {data.registration_number}
              </div>
              <div className="reg-date">
                <div className="label">
                  Registration date
                </div>
                {data.registration_date}
              </div>
            </div>
            <div className="qual">
              <div className="label">Qualification</div>
              {data.qualification}
            </div>
            <div className="location">
              <div className="label">
                State, Country
              </div>
              {data.state}, {data.country}
            </div>
          </div>
        </div>
    );
  }
}

export default DCard;
