/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";

class About extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="section-share section-about">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Truyền thông nói về BookingCare</span>
            </div>
          </div>
          <div className="section-about-content">
            <div className="video-about">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="logo-about">
              <div className="bg-image-about">
                <img src="https://bookingcare.vn/assets/truyenthong/vtv1.png"></img>
              </div>
              <div className="bg-image-about">
                <img src="https://bookingcare.vn/assets/truyenthong/ictnews.png"></img>
              </div>
              <div className="bg-image-about">
                <img src="https://bookingcare.vn/assets/truyenthong/vnexpress.png"></img>
              </div>
              <div className="bg-image-about">
                <img src="https://bookingcare.vn/assets/truyenthong/cuc-cong-nghe-thong-tin-bo-y-te-2.png"></img>
              </div>
              <div className="bg-image-about">
                <img src="https://bookingcare.vn/assets/truyenthong/infonet.png"></img>
              </div>
              <div className="bg-image-about">
                <img src="https://cdn.bookingcare.vn/fo/w256/2023/11/02/110757-dantrilogo.png"></img>
              </div>
            </div>
          </div>
          {/* <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="702"
                height="395"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
              <div className="bg-image-about">
                <img src="https://bookingcare.vn/assets/truyenthong/vtv1.png"></img>
              </div>
              <div className="bg-image-about">
                <img src="https://bookingcare.vn/assets/truyenthong/ictnews.png"></img>
              </div>
              <div className="bg-image-about">
                <img src="https://bookingcare.vn/assets/truyenthong/vnexpress.png"></img>
              </div>
              <div className="bg-image-about">
                <img src="https://bookingcare.vn/assets/truyenthong/cuc-cong-nghe-thong-tin-bo-y-te-2.png"></img>
              </div>
              <div className="bg-image-about">
                <img src="https://bookingcare.vn/assets/truyenthong/infonet.png"></img>
              </div>
              <div className="bg-image-about">
                <img src="https://cdn.bookingcare.vn/fo/w256/2023/11/02/110757-dantrilogo.png"></img>
              </div>
            </div>
          </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
