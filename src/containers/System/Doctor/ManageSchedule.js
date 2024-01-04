/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import {FormattedMessage} from "react-intl";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import {CRUD_ACTIONS, LANGUAGES, dateFormat} from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import {toast} from "react-toastify";
import _ from "lodash";
import {saveBulkScheduleDoctorService} from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.fetchAllScheduleTime();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({...item, isSelected: false}));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let {language} = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleChangeSelect = async (selectedDoctors) => {
    this.setState({
      selectedDoctor: selectedDoctors,
    });
  };
  handleChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickBtnTime = (times) => {
    let {rangeTime} = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === times.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    let {rangeTime, selectedDoctor, currentDate} = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Chọn ngày khám");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Chọn bác sĩ");
      return;
    }
    let formattedDates = new Date(currentDate).getTime();
    let formattedDate = formattedDates.toString();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formattedDate;
          object.timeType = item.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Chọn thời gian khám");
        return;
      }
    }
    let res = await saveBulkScheduleDoctorService({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formattedDate: formattedDate,
    });
    if (res && res.errorCode === 0) {
      toast.success("Tạo thành công");
    } else {
      toast.error("Tạo không thành công");
    }
  };
  render() {
    let {rangeTime} = this.state;
    let {language} = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    return (
      <React.Fragment>
        <div className="manage-schedule-container">
          <div className="manage-schedule-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.chooseDoctor" />
                </label>
                <Select className="" value={this.state.selectedDoctor} onChange={this.handleChangeSelect} options={this.state.listDoctor} />
              </div>
              <div className="col-4 form-group">
                <label>
                  <FormattedMessage id="manage-schedule.chooseDate" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleChangeDatePicker}
                  value={this.state.currentDate}
                  minDate={yesterday}
                />
              </div>
              <div className="col-2 button-save">
                <button onClick={() => this.handleSaveSchedule()} className="btn btn-primary">
                  <FormattedMessage id="manage-user.save" />
                </button>
              </div>
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        onClick={() => this.handleClickBtnTime(item)}
                        key={index}
                        className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                      >
                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleHour()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
