/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {connect} from "react-redux";
import "./RemedyModel.scss";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import {LANGUAGES, CRUD_ACTIONS, CommonUtils} from "../../../utils";
import _ from "lodash";

import Select from "react-select";

import {toast} from "react-toastify";
import {FormattedMessage} from "react-intl";
import moment from "moment";

class RemedyModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }
  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handleOnChangEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imgBase64: base64,
      });
    }
  };
  handlesendRemedyModal = async (event) => {
    this.props.sendRemedyModal(this.state);
    console.log(this.state);
  };
  render() {
    let {isOpenModal, dataModal, closeRemedyModal, sendRemedyModal} = this.props;
    return (
      <>
        <Modal className="remedy-modal-container" isOpen={isOpenModal} size="lg" centered={false}>
          <ModalHeader className="remedy-modal-header">
            <FormattedMessage id={"patient.remedy-modal.title"} />
          </ModalHeader>
          <ModalBody className="remedy-modal-body">
            <div className="row">
              <div className="col-6 form-group">
                <label>Email bệnh nhân</label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangEmail(event)}
                />
              </div>
              <div className="col-6 form-group">
                <label>Chọn file đơn thuốc</label>
                <input className="form-control-file" type="file" onChange={(event) => this.handleOnChangeImage(event)} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="remedy-modal-footer">
            <Button className="px-3" color="primary" onClick={() => this.handlesendRemedyModal()}>
              Gửi
            </Button>{" "}
            <Button className="px-3" color="secondary" onClick={closeRemedyModal}>
              Đóng
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {language: state.app.language, genders: state.admin.genders};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModel);
