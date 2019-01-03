import React from 'react';
import axios from 'axios';
import ta from 'time-ago';
import DCard from "./DCard.js";
// import { parse as parseURL } from 'url';

export default class toDoctorCard extends React.Component {
  constructor(props) {
    super(props)
    let stateVar = {
      level: 0,
      data: {},
      fetchingData: false,
      searchTerm: null,
      searchPlaceholder: "Search",
      domain: undefined
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
      stateVar.languageTexts = this.getLanguageTexts(this.props.dataJSON.data.language);
    }

    if(this.props.domain){
      stateVar.domain = this.props.domain;
    }

    if (this.props.siteConfigs) {
      stateVar.siteConfigs = this.props.siteConfigs;
    }

    this.state = stateVar;
    this.goHome = this.goHome.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    });
    console.log(this.state)
  }

  goHome() {
    this.setState({
      level: 0,
      searchPlaceholder: "Search name"
    })
  }

  handleSubmit() {
    let API = 'https://search-dodgy-doctors-izsk7ozifcsawmvchoxsv3p43u.ap-south-1.es.amazonaws.com/doctors/_search'
    let DEFAULT_QUERY = {
    "query": {
        "bool" : {
            "must" : {
                "query_string" : {
                    "query" : this.state.searchTerm // User Provided Name
                }
            },
            "should": {
                "term": {"country": "India"}
            }
        }
    }
}
    axios.get(API, {
  params: {
    source: JSON.stringify(DEFAULT_QUERY),
    source_content_type: 'application/json'
  }
})
      .then(result => {
        this.setState({
          data: result.data.hits.hits,
          level: 1, searchPlaceholder: "Next search" 
        })
        console.log(result.data.hits.hits)
    })
  }

  exportData() {
    return this.props.selector.getBoundingClientRect();
  }

  renderSixteenCol() {
    if (this.state.fetchingData) {
      return <div>Loading</div>;
    } else {
      let count = this.state.data.length;
      let data = this.state.data;
      return (
        <div className="pro-col-4">
        <div className="container">
          <div className="title" onClick={this.goHome}>FARZI DOCTOR</div>
           <div className="result-cards">
            {this.state.level === 0 && (
            <div className="intro-card">
              <div className="content">
                <div className="header">
                  <div className="header__title">
                    Is Your Doctor Registered?
                  </div>
                  <div className="header__icon">
                  <img src="Doc.svg" width="56px" />
                  </div>
                </div>
                <div className="description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </div>
                <div className="expand">Read more</div>
              </div>
            </div>
          )}
              {this.state.level === 1 && data.length > 0 && (data.map(e => (
                <DCard data={e._source} count={count} />
              )))}
              {this.state.level === 1 && data.length === 0 && (
                <div className="intro-card">
                <div className="content">
                No results found.</div></div>
                )}
            </div>
            <div className="search-container">
              <input className="search-input" key={this.state.level} name="searchTerm" placeholder={this.state.searchPlaceholder} onChange={this.handleChange} onFocus={this.value = ''}></input>
              <div className="search-submit" onClick={this.handleSubmit}><img src="arrow-right.svg" width="16px" className="search-submit-arrow" /></div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  getLanguageTexts(languageConfig) {
    let language = languageConfig ? languageConfig : "hindi",
      text_obj;

    switch(language.toLowerCase()) {
      case "hindi":
        text_obj = {
          font: "'Sarala', sans-serif"
        }
        break;
      default:
        text_obj = {
          font: undefined
        }
        break;
    }
    return text_obj;
  }
  render() {
    switch(this.props.mode) {
      case 'col16':
        return this.renderSixteenCol();
      case 'col7':
        return this.renderSevenCol();
      case 'col4':
        return this.renderFourCol();
      case 'col2':
        return this.renderTwoCol();
      default:
        return this.renderHTML(this.state.dataJSON.data);
    }
  }
}