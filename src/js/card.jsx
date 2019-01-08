import React from "react";
import axios from "axios";
import ta from "time-ago";
import DComponent from "./DComponent.js";
import VisibilitySensor from "react-visibility-sensor";
import DropDown from "./DropDown.js"
// import { parse as parseURL } from 'url';

export default class toDoctorCard extends React.Component {
  constructor(props) {
    super(props);
    let stateVar = {
      level: 0,
      data: {},
      fetchingData: false,
      searchTerm: "Shiv",
      searchPlaceholder: "Search",
      domain: undefined,
      visible: null,
      checkVis: false,
      location: 'India',
      start: 0,
      count: 0
    };

    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
      stateVar.languageTexts = this.getLanguageTexts(
        this.props.dataJSON.data.language
      );
    }

    if (this.props.domain) {
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
    console.log(this.state);
  }

  goHome() {
    this.setState({
      level: 0,
      searchPlaceholder: "Search name"
    });
  }

  locationSelect(e) {
    this.setState({location: e})
  }

  handleSubmit() {
    this.setState({ level: 1, start: 0 });
    let API =
      "https://search-dodgy-doctors-izsk7ozifcsawmvchoxsv3p43u.ap-south-1.es.amazonaws.com/doctors/_search";
    let DEFAULT_QUERY = {
      "from" : this.state.start, "size" : 20,
      query: {
        bool: {
          must: {
            query_string: {
              query: this.state.searchTerm // User Provided Name
            }
          },
          should: {
            term: { country: "India" }
          }
        }
      }
    }

      if (this.state.location === 'Punjab') {
        let DEFAULT_QUERY = {
          "from" : this.state.start, "size" : 20,
          query: {
            bool: {
              must: {
                query_string: {
                  query: this.state.searchTerm // User Provided Name
                }
              },
              should: {
                term: { state: "Punjab" }
              }
            }
          }
        }
      }
    
    axios
      .get(API, {
        params: {
          source: JSON.stringify(DEFAULT_QUERY),
          source_content_type: "application/json"
        }
      })
      .then(result => {
        setTimeout(
          function() {
            this.setState({
              data: result.data.hits.hits,
              count: result.data.hits.total,
              level: 2,
              searchPlaceholder: "Next search"
            });
          }.bind(this),
          2000
        );
        console.log(result.data.hits.total);
      });
  }

  exportData() {
    return this.props.selector.getBoundingClientRect();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    console.log('scroll')
  }

  renderSixteenCol() {
    if (this.state.fetchingData) {
      return <div>Loading</div>;
    } else {
      let count = this.state.count;
      let data = this.state.data;
      let states = [{title: "Punjab", key: "Punjab"}, {title: "India", key: "India"}]
      return (
        <div className="pro-col-4">
          <div className="container">
            <div className="title" onClick={this.goHome}>
              FARZI DOCTOR
            </div>
              {this.state.level === 1 && (
                <div className="intro-card">
                  <div className="content">
                    <div className="loading-container">
                      <div className="loading-text">Checking records for</div>
                      <div className="loading-name">
                        {this.state.searchTerm}
                      </div>
                      <div className="label">Searching</div>
                      <div className="progress" />
                    </div>
                  </div>
                </div>
              )}
              {this.state.level === 0 && (
                <div className="intro-card">
                  <div className="content">
                    <div className="header">
                      <div className="header__title">
                        Is Your Doctor Registered?
                      </div>
                      <div className="header__icon">
                        <img src="Doc.svg" width="30px" />
                      </div>
                      
                    </div>
                    <div className="label">Select region</div>
                    <DropDown options={states} placeHolder="India" onChange={e=>this.locationSelect(e)}/>
                    <div className="description">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </div>
                    <div className="expand">Read more</div>
                  </div>
                </div>
              )}
              {this.state.level == 2 && (<DComponent data={data} count={count} />)}
              {this.state.level === 2 &&
                data.length === 0 && (
                  <div className="intro-card">
                    <div className="content">No results found.</div>
                  </div>
                )}
            <div className="search-container" style={{marginTop: this.state.level === 2 ? '0px' : '30px'}}>
              <input
                className="search-input"
                key={this.state.level}
                name="searchTerm"
                placeholder={this.state.searchPlaceholder}
                onChange={this.handleChange}
                onFocus={(this.value = "")}
              />
              <div className="search-submit" onClick={this.handleSubmit}>
                <img
                  src="arrow-right.svg"
                  width="16px"
                  className="search-submit-arrow"
                />
              </div>

            </div>

          </div>
        </div>
      );
    }
  }

  render() {
    switch (this.props.mode) {
      case "col16":
        return this.renderSixteenCol();
      case "col7":
        return this.renderSevenCol();
      case "col4":
        return this.renderFourCol();
      case "col2":
        return this.renderTwoCol();
      default:
        return this.renderHTML(this.state.dataJSON.data);
    }
  }
}
