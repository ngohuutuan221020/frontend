/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";
import {CRUD_ACTIONS, LANGUAGES} from "../../../utils";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import {getDetailInforDoctor} from "../../../services/userService";

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctor: "",
      hasOldData: false,

      //save to doctor-infor
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpecialtyId: [],
      listClinicId: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedSpecialtyId: "",
      selectedClinicId: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      specialtyId: "",
      clinicId: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctorsRedux();
    this.props.getAllRequiredDoctorInfor();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let {resPrice, resPayment, resProvince, resSpecialty, resClinic} = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      let dataSelectSpecialtyId = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialtyId: dataSelectSpecialtyId,
        listClinicId: dataSelectClinic,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      let {resPrice, resPayment, resProvince} = this.props.allRequiredDoctorInfor;
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      this.setState({
        listDoctor: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let {language} = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          // let labelVi = `${item.valueVi}`;
          // let labelEn = `${item.valueEn}`;
          // object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          // object.value = item.keyMap;
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          // let labelVi = `${item.valueVi}`;
          // let labelEn = `${item.valueEn}`;
          // object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          // object.value = item.keyMap;
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  handleEditorChange = ({html, text}) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let {hasOldData} = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      specialtyId: this.state.selectedSpecialtyId.value,
      clinicId: this.state.selectedClinicId && this.state.selectedClinicId.value ? this.state.selectedClinicId.value : "",
    });
  };
  handleChangeSelect = async (selectedOption) => {
    let {listPrice, listPayment, listProvince, listSpecialtyId, listClinicId} = this.state;

    this.setState({selectedOption});
    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errorCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let priceId = "",
        paymentId = "",
        provinceId = "",
        nameClinic = "",
        addressClinic = "",
        note = "",
        specialtyId = "",
        clinicId = "",
        selectedPrice = "",
        selectedPayment = "",
        selectedProvince = "",
        selectedSpecialtyId = "",
        selectedClinicId = "";
      if (res.data.Doctor_Infor) {
        nameClinic = res.data.Doctor_Infor.nameClinic;
        addressClinic = res.data.Doctor_Infor.addressClinic;
        note = res.data.Doctor_Infor.note;

        priceId = res.data.Doctor_Infor.priceId;
        paymentId = res.data.Doctor_Infor.paymentId;
        provinceId = res.data.Doctor_Infor.provinceId;

        specialtyId = res.data.Doctor_Infor.specialtyId;
        clinicId = res.data.Doctor_Infor.clinicId;

        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialtyId = listSpecialtyId.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedClinicId = listClinicId.find((item) => {
          return item && item.value === clinicId;
        });
      }
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        nameClinic: nameClinic,
        addressClinic: addressClinic,
        note: note,
        selectedPrice: selectedPrice,
        selectedPayment: selectedPayment,
        selectedProvince: selectedProvince,
        selectedSpecialtyId: selectedSpecialtyId,
        selectedClinicId: selectedClinicId,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        nameClinic: "",
        addressClinic: "",
        note: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedSpecialtyId: "",
        selectedClinicId: "",
      });
    }
  };
  handleSelectedDoctorInfor = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = {...this.state};
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeText = (event, id) => {
    let stateCopy = {...this.state};
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    let {hasOldData, listSpecialtyId} = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="content-doctor">
          <div className="content-left form-group">
            <label className="">
              {" "}
              <FormattedMessage id="admin.manage-doctor.selectDoctor" />
            </label>
            <Select
              className=""
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctor}
              placeholder={<FormattedMessage id="admin.manage-doctor.selectDoctor" />}
            />
          </div>
          <div className="content-right form-group">
            <label className="">
              {" "}
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              value={this.state.description}
              onChange={(event) => this.handleOnChangeText(event, "description")}
              className="form-control"
            ></textarea>
          </div>
        </div>
        <div className="row doctor-infor">
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              name="selectedPrice"
              value={this.state.selectedPrice}
              onChange={this.handleSelectedDoctorInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              name="selectedPayment"
              value={this.state.selectedPayment}
              onChange={this.handleSelectedDoctorInfor}
              options={this.state.listPayment}
              placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              name="selectedProvince"
              value={this.state.selectedProvince}
              onChange={this.handleSelectedDoctorInfor}
              options={this.state.listProvince}
              placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              className="form-control"
              value={this.state.nameClinic}
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              className="form-control"
              value={this.state.addressClinic}
              onChange={(event) => this.handleOnChangeText(event, "addressClinic")}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input className="form-control" value={this.state.note} onChange={(event) => this.handleOnChangeText(event, "note")}></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.specialty" />
            </label>
            <Select
              name="selectedSpecialtyId"
              value={this.state.selectedSpecialtyId}
              onChange={this.handleSelectedDoctorInfor}
              options={this.state.listSpecialtyId}
              placeholder={<FormattedMessage id="admin.manage-doctor.specialty" />}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic" />
            </label>
            <Select
              name="selectedClinicId"
              value={this.state.selectedClinicId}
              onChange={this.handleSelectedDoctorInfor}
              options={this.state.listClinicId}
              placeholder={<FormattedMessage id="admin.manage-doctor.clinic" />}
            />
          </div>
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={hasOldData === true ? "btn-save-content-doctor" : "btn-create-content-doctor"}
        >
          {hasOldData === true ? (
            <span>
              {" "}
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              {" "}
              <FormattedMessage id="admin.manage-doctor.create" />
            </span>
          )}
        </button>
        <MdEditor
          value={this.state.contentMarkdown}
          style={{height: "500px"}}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getAllRequiredDoctorInfor: () => dispatch(actions.getAllRequiredDoctorInfor()),
    // fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
    // deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
