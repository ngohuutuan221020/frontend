/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./FormDefault.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

class FormDefault extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { language } = this.props;
    return (
      <>
        <div className=""></div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDefault);
