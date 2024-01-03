/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import {createNewSpecialty} from "../../../services/userService";
import {toast} from "react-toastify";
import {createNewClinic} from "../../../services/userService";
const mdParser = new MarkdownIt();

class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeIput = (event, id) => {
    let stateCopy = {...this.state};
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleEditorChange = ({html, text}) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errorCode === 0) {
      toast.success("Add new Clinic successfully");
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Add new Clinic failed");
    }
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  render() {
    let {language} = this.props;
    return (
      <>
        <div className="manage-specialty-container">
          <div className="ms-title">Quản lý phòng khám</div>

          <div className="specialty row">
            <div className="col-6 form-group">
              <label className="">Tên chuyên phòng khám</label>
              <input
                className="form-control"
                type="text"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeIput(event, "name")}
              />
            </div>
            <div className="col-6 form-group">
              <label className="">Hình ảnh</label>
              <input className="form-control-file" type="file" onChange={(event) => this.handleOnChangeImage(event)} />
            </div>
            <div className="col-6 form-group">
              <label className="">Địa chỉ phòng khám</label>
              <input
                className="form-control"
                type="text"
                value={this.state.address}
                onChange={(event) => this.handleOnChangeIput(event, "address")}
              />
            </div>
            <div className="col-12" style={{marginBottom: "10px"}}>
              <button className="btn btn-primary" onClick={() => this.handleSaveNewClinic()}>
                Add New
              </button>
            </div>

            <div className="col-12 form-group">
              <MdEditor
                style={{height: "500px"}}
                renderHTML={(text) => mdParser.render(text)}
                value={this.state.descriptionMarkdown}
                onChange={this.handleEditorChange}
              />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
