/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import "./UserManage.scss";
import {getAllUser, createNewUserService, deleteUserService, editUserService} from "../../services/userService";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import {emitter} from "../../utils/emitter";
import img from "../../assets/images/background-manage.jpg";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }
  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    let response = await getAllUser("ALL");
    if (response && response.errorCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  handleAddNewUser = () => {
    this.setState({isOpenModalUser: true});
  };
  toggleModalEditUser = () => {
    this.setState({isOpenModalEditUser: !this.state.isOpenModalEditUser});
  };
  toggleModalUser = () => {
    this.setState({isOpenModalUser: !this.state.isOpenModalUser});
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errorCode !== 0) {
        alert(response.errorMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleDeleteUser = async (item) => {
    console.log("delete user", item);
    try {
      let res = await deleteUserService(item.id);
      if (res && res.errorCode === 0) {
        await this.getAllUsersFromReact();
      }
      console.log("delete user", res);
    } catch (error) {
      console.log(error);
    }
  };
  handleEditUser = (item) => {
    console.log(item);
    this.setState({
      isOpenModalEditUser: true,
      userEdit: item,
    });
  };
  doEditUser = async (item) => {
    try {
      let res = await editUserService(item);
      if (res && res.errorCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUsersFromReact();
      } else {
        alert(res.errorCode);
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let arrayUsers = this.state.arrUsers;
    return (
      <div className="body-image">
        <img src={img} />
      </div>
      // <div className="user-container">
      //   <ModalUser
      //     isOpen={this.state.isOpenModalUser}
      //     toggleFromParent={this.toggleModalUser}
      //     createNewUser={this.createNewUser}
      //   />
      //   {this.state.isOpenModalEditUser && (
      //     <ModalEditUser
      //       isOpen={this.state.isOpenModalEditUser}
      //       toggleFromParent={this.toggleModalEditUser}
      //       currentUser={this.state.userEdit}
      //       editUser={this.doEditUser}
      //     />
      //   )}
      //   <div className="title text-center">Manage users</div>
      //   <div className="mx-3">
      //     <button
      //       className="btn- btn-primary p-3"
      //       style={{ borderRadius: "5px" }}
      //       onClick={() => this.handleAddNewUser()}
      //     >
      //       <i className="fas fa-user-plus mx-2"></i>
      //       Add new user
      //     </button>
      //   </div>
      //   <div className="user-table mt-3 mx-3">
      //     <table id="customers">
      //       <tbody>
      //         <tr>
      //           <th>Email</th>
      //           <th>First Name</th>
      //           <th>Last Name</th>
      //           <th>Address</th>
      //           <th>Number Phone</th>
      //           <th>ID</th>
      //           <th>Action</th>
      //         </tr>

      //         {arrayUsers &&
      //           arrayUsers.map((item, index) => {
      //             return (
      //               <tr key={item}>
      //                 <td>{item.email}</td>
      //                 <td>{item.firstName}</td>
      //                 <td>{item.lastName}</td>
      //                 <td>{item.address}</td>
      //                 <td>{item.phoneNumber}</td>
      //                 <td>{item.id}</td>
      //                 <td>
      //                   <button
      //                     className="btn-edit"
      //                     onClick={() => this.handleEditUser(item)}
      //                   >
      //                     <i className="fas fa-edit"></i>
      //                   </button>
      //                   <button
      //                     className="btn-delete"
      //                     onClick={() => this.handleDeleteUser(item)}
      //                   >
      //                     <i className="fas fa-trash-alt"></i>
      //                   </button>
      //                 </td>
      //               </tr>
      //             );
      //           })}
      //       </tbody>
      //     </table>
      //   </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
