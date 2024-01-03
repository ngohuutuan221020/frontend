/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import {postVerifyBookingAppointment} from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";
import "./VerifyEmailBooking.scss";
class VerifyEmailBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errorCode: 0,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let url = new URLSearchParams(this.props.location.search);
      let token = url.get("token");
      let doctorId = url.get("doctorId");
      let res = await postVerifyBookingAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errorCode === 0) {
        this.setState({
          statusVerify: true,
          errorCode: res.errorCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errorCode: res && res.errorCode ? res.errorCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let {language} = this.props;
    let {statusVerify, errorCode} = this.state;
    return (
      <>
        <HomeHeader />
        {statusVerify === false ? (
          <div>Loading data</div>
        ) : (
          <div>
            {+errorCode === 0 ? (
              <div className="booking-body">
                <img className="booking-image" src="https://costastaverna.co.nz/wp-content/uploads/2017/07/booking-confirmed.png" />
                <div className="booking-text">Xác nhận lịch hẹn thành công</div>
              </div>
            ) : (
              <div className="booking-body">
                <img className="booking-image" src="https://cdn0.iconfinder.com/data/icons/shift-interfaces/32/Error-512.png" />
                <div className="booking-text">Lịch hẹn không tồn tại hoặc đã được xác nhận</div>
              </div>
            )}
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmailBooking);
