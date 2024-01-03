import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }
  componentDidMount() {}

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
            Create new user
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
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
                this.handleAddNewUser();
              }}
            >
              Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
