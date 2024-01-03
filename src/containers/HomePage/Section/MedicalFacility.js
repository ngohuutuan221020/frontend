/* eslint-disable jsx-a11y/alt-text */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {getAllClinic} from "../../../services/userService";
import {withRouter} from "react-router-dom/cjs/react-router-dom";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errorCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };
  render() {
    let {dataClinic} = this.state;
    return (
      <React.Fragment>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Cơ sở y tế</span>
              {/* <button className="btn-section">Xem thêm</button> */}
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataClinic &&
                  dataClinic.length > 0 &&
                  dataClinic &&
                  dataClinic.map((item, index) => {
                    return (
                      <div className="specialty-custimize" key={index} onClick={() => this.handleViewDetailClinic(item)}>
                        <img src={item.image} className="image-clinic" />
                        <h3 className="text-clinic">{item.name}</h3>
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
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomePage));
