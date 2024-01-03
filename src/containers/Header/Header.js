import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils/";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  handleChangLanguage = (language) => {
    this.props.changLanguageAppRedux(language);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <span className="welcome">
          <FormattedMessage id={"homeHeader.Welcome"} />
          <span></span>
          {userInfo && userInfo.firstName ? userInfo.firstName : ""} !
        </span>
        <div className="languages">
          <div
            className={
              language === LANGUAGES.VI ? "language-vi active" : "language-vi"
            }
          >
            <span
              onClick={() => {
                this.handleChangLanguage(LANGUAGES.VI);
              }}
            >
              VN
            </span>
          </div>
          <div
            className={
              language === LANGUAGES.EN ? "language-en active" : "language-en"
            }
          >
            <span
              onClick={() => {
                this.handleChangLanguage(LANGUAGES.EN);
              }}
            >
              EN
            </span>
          </div>
        </div>

        {/* nút logout */}
        <div className="btn btn-logout" onClick={processLogout}>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
