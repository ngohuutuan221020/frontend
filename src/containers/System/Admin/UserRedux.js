/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import "../UserManage.scss";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
// import { values } from "lodash";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewsImgURL: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      role: "",
      position: "",
      avatar: "",
      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: arrRoles,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
      });
    }
    if (prevProps.listUser !== this.props.listUser) {
      let arrGenders = this.props.genderRedux;
      let arrPositions = this.props.positionRedux;
      let arrRoles = this.props.roleRedux;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewsImgURL: "",
      });
    }
  }
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let object = URL.createObjectURL(file);
      this.setState({
        previewsImgURL: object,
        avatar: base64,
      });
    }
  };
  openPrevImg = () => {
    if (!this.state.previewsImgURL) return;
    this.setState({
      isOpen: true,
    });
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let {action} = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    // this.props.fetchUserRedux();
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ["email", "password", "firstName", "lastName", "address", "phoneNumber"];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Please enter a valid email" + arrCheck[i]);
        break;
      }
    }
  };
  onChangeInput = (event, index) => {
    let copyState = {...this.state};
    copyState[index] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = Buffer.from(user.image, "base64").toString("binary");
    }
    this.setState({
      email: user.email,
      password: "toi_qua_met_moi_voi_do_an_nay _roi",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      previewsImgURL: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;

    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;

    let {email, password, firstName, lastName, address, phoneNumber, gender, position, role, avatar} = this.state;

    return (
      <>
        <div className="user-redux-container">
          <div className="title">Manage</div>
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div class="col-12 my-3">
                  <FormattedMessage id="manage-user.add" />
                </div>
                <div class="col-12">{isLoadingGender === true ? "Loading..." : ""}</div>
                <div class="col-3">
                  <label>
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                    value={email}
                    onChange={(event) => {
                      this.onChangeInput(event, "email");
                    }}
                    type="text"
                    class="form-control"
                    id=""
                    placeholder="Email"
                  />
                </div>
                <div class="col-3">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                    value={[password]}
                    onChange={(event) => {
                      this.onChangeInput(event, "password");
                    }}
                    type="password"
                    class="form-control"
                    id=""
                    placeholder="Password"
                  />
                </div>
                <div class="col-3">
                  <label>
                    <FormattedMessage id="manage-user.firstName" />
                  </label>
                  <input
                    value={firstName}
                    onChange={(event) => {
                      this.onChangeInput(event, "firstName");
                    }}
                    type="text"
                    class="form-control"
                    id=""
                    placeholder="First Name"
                  />
                </div>
                <div class="col-3">
                  <label>
                    <FormattedMessage id="manage-user.lastName" />
                  </label>
                  <input
                    value={lastName}
                    onChange={(event) => {
                      this.onChangeInput(event, "lastName");
                    }}
                    type="text"
                    class="form-control"
                    id=""
                    placeholder="Last Name"
                  />
                </div>
                <div class="col-9">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    value={address}
                    onChange={(event) => {
                      this.onChangeInput(event, "address");
                    }}
                    type="text"
                    class="form-control"
                    id=""
                    placeholder="123 Address ..."
                  />
                </div>
                <div class="col-3">
                  <label>
                    <FormattedMessage id="manage-user.phoneNumber" />
                  </label>
                  <input
                    value={phoneNumber}
                    onChange={(event) => {
                      this.onChangeInput(event, "phoneNumber");
                    }}
                    type="text"
                    class="form-control"
                    id=""
                    placeholder="Phone Number"
                  />
                </div>
                <div class="col-3">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    class="form-control"
                    value={gender}
                    onChange={(event) => {
                      this.onChangeInput(event, "gender");
                    }}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div class="col-3">
                  <label>
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    class="form-control"
                    value={position}
                    onChange={(event) => {
                      this.onChangeInput(event, "position");
                    }}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div class="col-3">
                  <label>
                    <FormattedMessage id="manage-user.roleId" />
                  </label>
                  <select
                    class="form-control"
                    value={role}
                    onChange={(event) => {
                      this.onChangeInput(event, "role");
                    }}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div class="col-3">
                  <label>
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="form-control upload">
                    <input id="PrevImg" type="file" hidden onChange={(event) => this.handleOnChangeImage(event)} />
                    <label className="label-upload" htmlFor="PrevImg">
                      <i className="fas fa-upload"></i>DownLoad
                    </label>
                    <div
                      onClick={() => this.openPrevImg()}
                      className="prev-image"
                      style={{
                        backgroundImage: `url(${this.state.previewsImgURL})`,
                      }}
                    ></div>
                  </div>
                </div>
                <div class="col-12">
                  <button
                    type="submit"
                    class={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                    onClick={() => {
                      this.handleSaveUser();
                    }}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.edit" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12 mb-5">
              <TableManageUser action={this.state.action} handleEditUserFromParentKey={this.handleEditUserFromParent} />
            </div>
          </div>
          {this.state.isOpen === true && (
            <Lightbox mainSrc={this.state.previewsImgURL} onCloseRequest={() => this.setState({isOpen: false})} />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUser: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) => dispatch(actions.editUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
