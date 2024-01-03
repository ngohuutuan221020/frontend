import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "code",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
    console.log("DidMount", this.props.currentUser);
  }

  toggle = () => {
    this.props.toggleFromParent();
  };
  handleOnChangeInput = (event, index) => {
    let copyState = { ...this.state };
    copyState[index] = event.target.value;
    this.setState({ ...copyState }, () => {});
  };

  checkValid = () => {
    let isValue = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValue = false;
        alert("Missing parameter " + arrInput[i]);
        break;
      }
    }
    return isValue;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValid();
    if (isValid === true) {
      this.props.createNewUser(this.state);
    }
  };
  handleSaveUser = () => {
    let isValid = this.checkValid();
    if (isValid === true) {
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <div>
        <Modal
          className="modal-user-container"
          isOpen={this.props.isOpen}
          toggle={() => {
            this.toggle();
          }}
          size="lg"
          centered={false}
        >
          <ModalHeader
            toggle={() => {
              this.toggle();
            }}
          >
            Edit user
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  disabled
                  value={this.state.email}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  type="text"
                  placeholder="Email..."
                ></input>
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  disabled
                  value={this.state.password}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                  type="password"
                  placeholder="Password..."
                ></input>
              </div>
              <div className="input-container">
                <label>First Name</label>
                <input
                  value={this.state.firstName}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "firstName");
                  }}
                  type="text"
                ></input>
              </div>
              <div className="input-container">
                <label>Last Name</label>
                <input
                  value={this.state.lastName}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "lastName");
                  }}
                  type="text"
                ></input>
              </div>
              <div className="input-container max-width">
                <label>Address</label>
                <input
                  value={this.state.address}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                  type="text"
                ></input>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="px-3"
              color="primary"
              onClick={() => {
                this.handleSaveUser();
              }}
            >
              Save
            </Button>{" "}
            <Button
              className="px-3"
              color="secondary"
              onClick={() => {
                this.toggle();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
