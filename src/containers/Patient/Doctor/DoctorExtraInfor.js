import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import "./DoctorExtraInfor.scss";
import moment from "moment";
import {LANGUAGES} from "../../../utils";
import {getDoctorExtraInforById} from "../../../services/userService";
import localization from "moment/locale/vi";
import {FormattedMessage} from "react-intl";
import NumberFormat from "react-number-format";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetails: false,
      extraInfor: {},
    };
  }
  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getDoctorExtraInforById(this.props.doctorIdFromParent);
      if (res && res.errorCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getDoctorExtraInforById(this.props.doctorIdFromParent);
      if (res && res.errorCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }
  showHideDetails = (status) => {
    this.setState({isShowDetails: status});
  };
  render() {
    let {isShowDetails, extraInfor} = this.state;
    let {language} = this.props;

    return (
      <>
        <div className="doctor-extra-infor-container">
          <div className="content-top">
            <div className="text-address">
              <FormattedMessage id="patient.doctor-extra-infor.text-address" />{" "}
            </div>
            <div className="name-clinic">{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}</div>
            <div className="detail-address">{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ""}</div>
          </div>
          <div className="content-bottom">
            {isShowDetails === false ? (
              <div className="price-doctor">
                <FormattedMessage id="patient.doctor-extra-infor.price" />{" "}
                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
                  <NumberFormat value={extraInfor.priceTypeData.valueVi} displayType="text" thousandSeparator={true} suffix="VND" />
                )}
                {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
                  <NumberFormat value={extraInfor.priceTypeData.valueEn} displayType="text" thousandSeparator={true} suffix="$" />
                )}
                <span className="span" onClick={() => this.showHideDetails(true)}>
                  <FormattedMessage id="patient.doctor-extra-infor.detail" />{" "}
                </span>
              </div>
            ) : (
              <>
                <div className="price-doctor">
                  <FormattedMessage id="patient.doctor-extra-infor.price" />{" "}
                  {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI && (
                    <NumberFormat value={extraInfor.priceTypeData.valueVi} displayType="text" thousandSeparator={true} suffix="VND" />
                  )}
                  {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN && (
                    <NumberFormat value={extraInfor.priceTypeData.valueEn} displayType="text" thousandSeparator={true} suffix="$" />
                  )}
                </div>
                <div className="detail-infor">
                  <span>{extraInfor && extraInfor.note ? extraInfor.note : ""}</span>
                </div>
                <div className="payment">
                  <span>
                    {" "}
                    <FormattedMessage id="patient.doctor-extra-infor.payment" />{" "}
                    {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.VI && extraInfor.paymentTypeData.valueVi}
                    {extraInfor && extraInfor.paymentTypeData && language === LANGUAGES.EN && extraInfor.paymentTypeData.valueEn}
                  </span>
                </div>
                <div className="hide-price">
                  {" "}
                  <span onClick={() => this.showHideDetails(false)}>
                    <FormattedMessage id="patient.doctor-extra-infor.hide-detail" />
                  </span>
                </div>
              </>
            )}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
