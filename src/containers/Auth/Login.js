/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import { handleLoginAPI } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errorMessage: "",
    };
  }
  handleOnChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  handleOnChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleLogin = async () => {
    this.setState({
      errorMessage: "",
    });
    try {
      let data = await handleLoginAPI(this.state.username, this.state.password);
      if (data && data.errorCode !== 0) {
        this.setState({
          errorMessage: data.message,
        });
      }
      if (data && data.errorCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log("Dang nhap thanh cong");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errorMessage: error.response.data.message,
          });
        }
      }
    }
  };
  handleShowHidePassword = (event) => {
    this.setState({ isShowPassword: !this.state.isShowPassword });
  };
  handlerKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>
            <div className="col-12 form-group login-input">
              <label>UserName: </label>
              <input
                onChange={(event) => this.handleOnChangeUsername(event)}
                value={this.state.username}
                type="text"
                className="form-control"
                placeholder="Enter your username"
              />
            </div>
            <div className="col-12 form-group login-input">
              <label> Password: </label>
              <div className="custom-input-password">
                <input
                  onKeyDown={(event) => this.handlerKeyDown(event)}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  value={this.state.password}
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPassword
                        ? "fas fa-eye eye"
                        : "fas fa-eye-slash eye"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errorMessage}
            </div>
            <div className="col-12">
              <button
                onClick={() => {
                  this.handleLogin();
                }}
                className="btn-login"
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password ?</span>
            </div>
            <div className="col-12 text-center">
              <span className="text-other-login">Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-facebook-f facebook"></i>

              <i className="fab fa-google google"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
