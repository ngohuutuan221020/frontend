import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment";
import {LANGUAGES} from "../../../utils";
import {getScheduleDoctorByDate} from "../../../services/userService";
import localization from "moment/locale/vi";
import {FormattedMessage} from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalabelTime: [],
      dataScheduleTimeModal: {},
      isOpenModal: false,
    };
  }
  async componentDidMount() {
    let {language} = this.props;
    let allDays = this.getArrDays(language);

    if (this.props.doctorIdFromParent) {
      let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
      this.setState({
        allAvalabelTime: res.data ? res.data : [],
      });
    }

    this.setState({
      allDays: allDays,
    });
  }
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  getArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let valueVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(valueVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date()).add(i, "days").locale("en").format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object);
    }
    return allDays;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
      this.setState({
        allAvalabelTime: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errorCode === 0) {
        this.setState({
          allAvalabelTime: res.data ? res.data : [],
        });
      }
    }
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModal: true,
      dataScheduleTimeModal: time,
    });
  };
  handleClickCloseScheduleTime = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  render() {
    let {allDays, allAvalabelTime, isOpenModal, dataScheduleTimeModal} = this.state;
    let {language} = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-availabel-time">
            <div className="text-calender">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {allAvalabelTime && allAvalabelTime.length > 0 ? (
                <>
                  <div className="top-content">
                    {allAvalabelTime.map((item, index) => {
                      let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                      return (
                        <button key={index} onClick={() => this.handleClickScheduleTime(item)}>
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>
                  <div className="bottom-content">
                    <span>
                      <i className="far fa-hand-pointer"></i>
                      <FormattedMessage id="patient.detail-doctor.choose-schedule" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="background-calendar">
                  <div className="image"></div>
                  <span>
                    <FormattedMessage id="patient.detail-doctor.no-schedule" />
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModal}
          handleClickCloseScheduleTime={this.handleClickCloseScheduleTime}
          dataScheduleTimeModal={dataScheduleTimeModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
