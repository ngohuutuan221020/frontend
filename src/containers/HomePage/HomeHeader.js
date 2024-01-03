/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import {LANGUAGES} from "../../utils/constant";
import {changeLanguage} from "../../store/actions/appActions";
import "./HomeHeader.scss";
import {withRouter} from "react-router-dom/cjs/react-router-dom";
import logo from "../../assets/images/LOGO-SUC-KHOE.jpg";
class HomeHeader extends Component {
  changLanguage = (language) => {
    this.props.changLanguageAppRedux(language);
  };
  returnHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    let language = this.props.language;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="LOGO">
              <img src={logo} onClick={() => this.returnHome()} />
              {/* <div className="header-logo" onClick={() => this.returnHome()}></div> */}
            </div>
            <div className="CONTENT">
              <div className="child-content">
                <b>
                  <FormattedMessage id="homeHeader.Doctor" />
                </b>
                <div className="sub-title">
                  <FormattedMessage id="homeHeader.subDoctor" />
                </div>
              </div>
              <div className="child-content">
                <b>
                  <FormattedMessage id="homeHeader.Speciality" />
                </b>

                <div className="sub-title">
                  <FormattedMessage id="homeHeader.subSpeciality" />
                </div>
              </div>
              <div className="child-content">
                <b>
                  <FormattedMessage id="homeHeader.Healthfacilities" />
                </b>

                <div className="sub-title">
                  <FormattedMessage id="homeHeader.subHealthfacilities" />
                </div>
              </div>
            </div>
            <div className="SUPPORT">
              <i className="fas fa-question-circle">
                <FormattedMessage id="homeHeader.Supports" />
              </i>
              <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}>
                <span
                  onClick={() => {
                    this.changLanguage(LANGUAGES.VI);
                  }}
                >
                  VN
                </span>
              </div>
              <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
                <span
                  onClick={() => {
                    this.changLanguage(LANGUAGES.EN);
                  }}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
          {/* <div className="home-header-content">
            <div className="left-content">
              <div className="header-logo" onClick={() => this.returnHome()}></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.Doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeHeader.subDoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.Speciality" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeHeader.subSpeciality" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.Healthfacilities" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeHeader.subHealthfacilities" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeHeader.ExaminationPackage" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeHeader.subExaminationPackage" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle">
                  <FormattedMessage id="homeHeader.Supports" />
                </i>
                <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}>
                  <span
                    onClick={() => {
                      this.changLanguage(LANGUAGES.VI);
                    }}
                  >
                    VN
                  </span>
                </div>
                <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
                  <span
                    onClick={() => {
                      this.changLanguage(LANGUAGES.EN);
                    }}
                  >
                    EN
                  </span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {this.props.banner === true && (
          <div className="home-header-banner">
            <div className="content-top">
              <div className="title1">
                <FormattedMessage id="homeBanner.Title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="homeBanner.Title2" />
              </div>
              {/* <div className="search">
                <i className="fas fa-search"></i>
                <input className="" type="text" placeholder=" "></input>
              </div> */}
            </div>
            <div className="content-bottom">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child1">
                    <div className="iconss"></div>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="homeBanner.Child1" />
                  </div>
                </div>

                <div className="option-child">
                  <div className="icon-child3">
                    <div className="iconss"></div>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="homeBanner.Child3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child4">
                    <div className="iconss"></div>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="homeBanner.Child4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child5"></div>
                  <div className="text-child">
                    <FormattedMessage id="homeBanner.Child5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child6">
                    <div className="iconss"></div>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="homeBanner.Child6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changLanguageAppRedux: (language) => dispatch(changeLanguage(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
