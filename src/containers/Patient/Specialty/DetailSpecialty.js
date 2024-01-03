/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./DetailSpecialty.scss";
import {LANGUAGES} from "../../../utils";
import {FormattedMessage} from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {getAllDetailSpecialty, getAllCodeService} from "../../../services/userService";
import _ from "lodash";
import Select from "react-select";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      listProvice: [],
      dataDetailSpecialty: {},
    };
  }
  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;

      let res = await getAllDetailSpecialty({
        id: id,
        location: "ALL",
      });
      let reslistProvice = await getAllCodeService("PROVINCE");

      if (res && res.errorCode === 0 && reslistProvice && reslistProvice.errorCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = reslistProvice.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueVi: "Toàn quốc",
            valueEn: "ALL",
          });
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvice: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChange = async (event) => {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let location = event.target.value;

      let res = await getAllDetailSpecialty({
        id: id,
        location: location,
      });

      if (res && res.errorCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  render() {
    let {language} = this.props;
    let {arrDoctorId, dataDetailSpecialty, listProvice} = this.state;
    console.log("check state", this.state);
    return (
      <>
        <div className="detail-specialty-container">
          <HomeHeader banner={false} />
          <div className="detail-specialty-body">
            <div className="description-specialty">
              {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailSpecialty.descriptionHTML,
                  }}
                ></div>
              )}
            </div>
            <div className="search-specialty-doctor">
              <select onChange={(event) => this.handleOnChange(event)}>
                {listProvice &&
                  listProvice.length > 0 &&
                  listProvice.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor" key={index}>
                    <div className="detail-content-left">
                      <div className="profile-doctor">
                        <ProfileDoctor doctorId={item} isShowDescriptionDoctor={true} isShowMore={true} />
                      </div>
                    </div>
                    <div className="detail-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule doctorIdFromParent={item} />
                      </div>
                      <div className="doctor-extra-info">
                        <DoctorExtraInfor doctorIdFromParent={item} />
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <HomeFooter />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {language: state.app.language};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
