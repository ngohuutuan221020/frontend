/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./BookingModal.scss";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import {LANGUAGES} from "../../../../utils";
import Select from "react-select";
import {postPatientBookingAppointment} from "../../../../services/userService";
import {toast} from "react-toastify";
import {FormattedMessage} from "react-intl";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      birthday: "",
      genders: "",
      selectedGenders: "",
      email: "",
      address: "",
      reason: "",
      doctorId: "",
      timeType: "",
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGeners = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGeners(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGeners(this.props.genders),
      });
    }
    if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
      if (this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)) {
        let doctorId = this.props.dataScheduleTimeModal.doctorId;
        let timeType = this.props.dataScheduleTimeModal.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }
  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = {...this.state};
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = (selectedOptions) => {
    this.setState({
      selectedGenders: selectedOptions,
    });
  };
  handleConfirmBooking = async () => {
    this.setState({
      isShowLoading: true,
    });
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
    let doctorName = this.buildName(this.props.dataScheduleTimeModal);

    let res = await postPatientBookingAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      date: this.props.dataScheduleTimeModal.date,
      birthday: date,
      genders: this.state.genders,
      selectedGenders: this.state.selectedGenders.value,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    this.setState({
      isShowLoading: false,
    });
    if (res && res.errorCode === 0) {
      toast.success("Dat lich thanh cong");
      this.props.handleClickCloseScheduleTime();
    } else {
      toast.error("Dat lich that bai");
    }
  };
  buildTimeBooking = (dataScheduleTimeModal) => {
    let {language} = this.props;
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      let time = language === LANGUAGES.VI ? dataScheduleTimeModal.timeTypeData.valueVi : dataScheduleTimeModal.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataScheduleTimeModal.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataScheduleTimeModal.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return ` ${time} - ${date}`;
    }
    return "";
  };
  buildName = (dataScheduleTimeModal) => {
    let {language} = this.props;
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataScheduleTimeModal.doctorData.lastName} ${dataScheduleTimeModal.doctorData.firstName}`
          : `${dataScheduleTimeModal.doctorData.firstName} ${dataScheduleTimeModal.doctorData.lastName}`;

      return name;
    }
    return "";
  };
  buildPrice = (dataScheduleTimeModal) => {
    let {language} = this.props;
    if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
      let price =
        language === LANGUAGES.VI
          ? `${dataScheduleTimeModal.doctorData.lastName} ${dataScheduleTimeModal.doctorData.firstName}`
          : `${dataScheduleTimeModal.doctorData.firstName} ${dataScheduleTimeModal.doctorData.lastName}`;

      return price;
    }
    return "";
  };
  render() {
    let {language, isOpenModal, handleClickCloseScheduleTime, dataScheduleTimeModal} = this.props;
    let doctorId = dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : "";

    return (
      <>
        {" "}
        <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading ...">
          <Modal className="booking-modal-container" isOpen={isOpenModal} size="lg" centered={false}>
            <ModalHeader className="booking-modal-header">
              <FormattedMessage id={"patient.booking-modal.title"} />
            </ModalHeader>
            <ModalBody className="booking-modal-body">
              <div className="doctor-infor">
                <ProfileDoctor dataScheduleTimeModal={dataScheduleTimeModal} isShowDescriptionDoctor={false} doctorId={doctorId} />
              </div>

              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.fullName"} />
                  </label>
                  <input
                    value={this.state.fullName}
                    onChange={(event) => this.handleOnChangeInput(event, "fullName")}
                    className="form-control"
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.phoneNumber"} />
                  </label>
                  <input
                    value={this.state.phoneNumber}
                    onChange={(event) => this.handleOnChangeInput(event, "phoneNumber")}
                    className="form-control"
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.birthday"} />
                  </label>

                  <DatePicker className="form-control" onChange={this.handleChangeDatePicker} value={this.state.birthday} />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.gender"} />
                  </label>
                  <Select onChange={this.handleChangeSelect} value={this.state.selectedGenders} options={this.state.genders} />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.email"} />
                  </label>
                  <input value={this.state.email} onChange={(event) => this.handleOnChangeInput(event, "email")} className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.address"} />
                  </label>
                  <input
                    value={this.state.address}
                    onChange={(event) => this.handleOnChangeInput(event, "address")}
                    className="form-control"
                  />
                </div>
                <div className="col-12 form-group">
                  <label>
                    <FormattedMessage id={"patient.booking-modal.reason"} />
                  </label>
                  <textarea
                    value={this.state.reason}
                    onChange={(event) => this.handleOnChangeInput(event, "reason")}
                    className="form-control"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="booking-modal-footer">
              <Button
                className="px-3"
                color="primary"
                onClick={() => {
                  this.handleConfirmBooking();
                }}
              >
                <FormattedMessage id={"patient.booking-modal.create"} />
              </Button>{" "}
              <Button className="px-3" color="secondary" onClick={handleClickCloseScheduleTime}>
                <FormattedMessage id={"patient.booking-modal.exit"} />
              </Button>
            </ModalFooter>
          </Modal>{" "}
        </LoadingOverlay>
        {/* <Modal
          className="booking-modal-container"
          isOpen={true}
          // toggle={() => {
          //   this.toggle();
          // }}
          size="lg"
          centered={false}
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">Thông tim đặt lịch khám bệnh</span>
              <span className="right">
                <i className="fas fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">booking-modal-body</div>
            <div className="booking-modal-footer">booking-modal-footer</div>
          </div>
        </Modal> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
