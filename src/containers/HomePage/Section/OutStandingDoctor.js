/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import {LANGUAGES} from "../../../utils";
import {FormattedMessage} from "react-intl";
import {withRouter} from "react-router-dom/cjs/react-router-dom";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  handleViewDetailDoctor = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${item.id}`);
    }
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    // arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
    let {language} = this.props;
    return (
      <React.Fragment>
        <div className="section-share section-outStanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homePage.outStandingDoctor" />
              </span>
              {/* <button className="btn-section">
                {" "}
                <FormattedMessage id="homePage.moreInfo" />
              </button> */}
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let imagebase = "";
                    if (item.image) {
                      imagebase = Buffer.from(item.image, "base64").toString("binary");
                    }

                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                    console.log("check item", item);
                    return (
                      <div className="specialty-custimize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                        <div className="outer-background">
                          <img className="background avata-doctor" src={imagebase} />
                          <div className="position text-center">
                            <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                            {/* <div>Chuyên khoa mắt</div> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
