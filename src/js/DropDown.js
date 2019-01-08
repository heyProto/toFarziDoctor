import React, { Component } from "react";
import styles from "./DropDown.css";

//DropDown options format:
//[{title(*): dsadas, subtitle: sdasd, key(*): sadsdad}, {title(*): dsadas, subtitle: sdasd, key(*): sadsdad}]

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      selectedTitle: null,
      selected: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClick() {
    if (!this.state.isOpened) {
      document.addEventListener("click", this.handleClickOutside, false);
    } else {
      document.removeEventListener("click", this.handleClickOutside, false);
    }

    this.setState(prevState => ({
      isOpened: !prevState.isOpened,
    }));
  }

  handleClickOutside() {
    document.removeEventListener("click", this.handleClickOutside, false);
    this.setState({
      isOpened: false,
    });
  }

  handleSelect(key) {
    const list = this.props.options;
    if (this.state.selected !== key) {
      this.setState(prevState => ({
        selected: key,
        isOpened: !prevState.isOpened,
        selectedTitle: list.find(x => x.key === key).title,
      }));
      this.props.onChange(key);
      this.setState({ selected: null });
    }
    console.log(this.state);
  }

  render() {
    const list = this.props.options;
    const { isOpened, selected, selectedTitle } = this.state;
    let width = this.props.width ? this.props.width : "100%";
    let contentDisplay = isOpened ? "block" : "none";
      return (
        <div className="editor-dropdown">
          <div className="dd-content">
            <div
              className="dd-header"
              onClick={() => this.handleClick()}
              style={{ width: width }}
            >
              <div className="dd-header__title">
                {selectedTitle || this.props.placeHolder} <div className="dd-arrow">{isOpened ? '▴' : '▾'}</div>
              </div>
              {isOpened ? (
                ''
              ) : (
                ''
              )}
            </div>
            {isOpened && (
              <div className="dd-list" style={{ width: width }}>
                {list.map(item => {
                  return (
                    <div
                      className="dd-list__item"
                      style={{ width: width }}
                      key={item.key}
                      onClick={e => this.handleSelect(item.key)}
                    >
                      <div className="dd-list__title">{item.title}</div>
                      {item.subtitle && (
                        <div className="dd-list__subtitle">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      );
  }
}

export default DropDown;
