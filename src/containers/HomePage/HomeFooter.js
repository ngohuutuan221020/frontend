/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="Home-Footer">
          <p>
            &copy; 2023 Booking Care <a href="#">Đồ án tôt nghiệp</a>
          </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
