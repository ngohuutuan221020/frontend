/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="section-share section-handBook">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Cẩm nang</span>
              <button className="btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="specialty-custimize">
                  <img src="https://cdn.bookingcare.vn/fo/w384/2023/10/21/203645-gia-xet-nghiem-nipt-ha-noi.png" />
                  <h3>Co xuong khop</h3>
                </div>
                <div className="specialty-custimize">
                  <img src="https://cdn.bookingcare.vn/fo/w384/2023/10/21/203645-gia-xet-nghiem-nipt-ha-noi.png" />
                  <h3>Co xuong khop</h3>
                </div>
                <div className="specialty-custimize">
                  <img src="https://cdn.bookingcare.vn/fo/w384/2023/10/21/203645-gia-xet-nghiem-nipt-ha-noi.png" />
                  <h3>Co xuong khop</h3>
                </div>
                <div className="specialty-custimize">
                  <img src="https://cdn.bookingcare.vn/fo/w384/2023/10/21/203645-gia-xet-nghiem-nipt-ha-noi.png" />
                  <h3>Co xuong khop</h3>
                </div>
                <div className="specialty-custimize">
                  <img src="https://cdn.bookingcare.vn/fo/w384/2023/10/21/203645-gia-xet-nghiem-nipt-ha-noi.png" />
                  <h3>Co xuong khop</h3>
                </div>
                <div className="specialty-custimize">
                  <img src="https://cdn.bookingcare.vn/fo/w384/2023/10/21/203645-gia-xet-nghiem-nipt-ha-noi.png" />
                  <h3>Co xuong khop</h3>
                </div>
                <div className="specialty-custimize">
                  <img src="https://cdn.bookingcare.vn/fo/w384/2023/10/21/203645-gia-xet-nghiem-nipt-ha-noi.png" />
                  <h3>Co xuong khop</h3>
                </div>
                <div className="specialty-custimize">
                  <img src="https://cdn.bookingcare.vn/fo/w384/2023/10/21/203645-gia-xet-nghiem-nipt-ha-noi.png" />
                  <h3>Co xuong khop</h3>
                </div>
                <div className="specialty-custimize">
                  <img src="https://cdn.bookingcare.vn/fo/w384/2023/10/21/203645-gia-xet-nghiem-nipt-ha-noi.png" />
                  <h3>Co xuong khop</h3>
                </div>
                <div className="specialty-custimize">
                  <img src="https://cdn.bookingcare.vn/fo/w384/2023/10/21/203645-gia-xet-nghiem-nipt-ha-noi.png" />
                  <h3>Co xuong khop</h3>
                </div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
