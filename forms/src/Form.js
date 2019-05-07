import React from "react";
import "./style.css";
import { FormErrors } from "./FormErrors";
class Form extends React.Component {
  state = {
    fullName: "",
    displayName: "",
    workspaceName: "",
    role: "",
    formsError: {
      fullName: "",
      displayName: "",
      workspace: "",
      role: ""
    },
    fullNameValid: false,
    displayNameValid: false,
    workspaceNameValid: false,
    roleValid: false,
    formValid: false
  };

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formsError;
    let fullNameValid = this.state.fullNameValid;
    let displayNameValid = this.state.displayNameValid;
    let workspaceNameValid = this.state.workspaceNameValid;
    let roleValid = this.state.roleValid;

    switch (fieldName) {
      case "fullName":
        fullNameValid = value.length > 0;
        fieldValidationErrors.fullName = fullNameValid
          ? ""
          : "Please Enter Full Name";
        break;
      case "displayName":
        displayNameValid = value.length > 0;
        fieldValidationErrors.displayName = displayNameValid
          ? ""
          : "Please Enter Display Name";
        break;
      case "workspaceName":
        workspaceNameValid = value.length > 0;
        fieldValidationErrors.workspaceName = workspaceNameValid
          ? ""
          : "Please Enter Workspace Name";
        break;
      case "role":
        roleValid = value.length > 0;
        fieldValidationErrors.role = roleValid ? "" : "Please Enter Role";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        fullNameValid: fullNameValid,
        displayNameValid: displayNameValid,
        workspaceNameValid: workspaceNameValid,
        roleValid: roleValid
      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid:
        this.state.fullNameValid &&
        this.state.displayNameValid &&
        this.state.workspaceNameValid &&
        this.state.roleValid
    });
  }

  handelSubmit = evt => {
    console.log(this.state);
    evt.preventDefault();
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "5%" }}>
        <h2>Profile Details</h2>
        <div className="ui grid">
          <div className="four wide column" />
          <div className="twelve wide column">
            <div className="error">
              <FormErrors formsError={this.state.formsError} />
            </div>
            <form onSubmit={this.handelSubmit} className="ui form">
              <div className="field">
                <label>FULL NAME</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="FULL NAME"
                  value={this.state.fullName}
                  onChange={e => this.handleUserInput(e)}
                />
              </div>

              <div className="field">
                <label>DISPLAY NAME</label>
                <input
                  type="text"
                  name="displayName"
                  placeholder="DISPLAY NAME"
                  value={this.state.displayName}
                  onChange={e => this.handleUserInput(e)}
                />
              </div>
              <div className="field">
                <label>WORKSPACE NAME</label>
                <input
                  type="text"
                  name="workspaceName"
                  placeholder="WORKSPACE NAME"
                  value={this.state.workspaceName}
                  onChange={e => this.handleUserInput(e)}
                />
              </div>
              <div className="field">
                <label>ROLE</label>
                <input
                  type="text"
                  name="role"
                  placeholder="ROLE"
                  value={this.state.role}
                  onChange={e => this.handleUserInput(e)}
                />
              </div>

              <button
                className="ui button right floated"
                disabled={!this.state.formValid}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
