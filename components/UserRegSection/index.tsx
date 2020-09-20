import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import * as Yup from "yup";
import { withRouter } from "next/router";
import { Posting, post } from "../../redux/actionCreators/PostActions";
import { BuyerSignUpForm } from "../BuyerSignUpForm";
import { apiUrl as path } from "../../services";
import {
  UserRegProps,
  UserRegDispatchProps,
  UserRegState,
  MapDispatch,
  MapProps,
} from "./@types";

export * from "./@types";

type Props = UserRegDispatchProps & UserRegProps;

const schema = Yup.object().shape({
  first_name: Yup.string()
    .label("First name")
    .min(2, "First name is too Short!")
    .max(20, "First name is too Long!")
    .required("First name is required"),
  last_name: Yup.string()
    .label("Last name")
    .min(2, "Last name is too Short!")
    .max(20, "Last name is too Long!")
    .required("Last name is required"),
  phone_number: Yup.string()
    .label("Phone number")
    .required("Phone number is required")
    .min(11, "Invalid Phone Number"),
  email: Yup.string()
    .label("Email")
    .email("Invalid Email")
    .required("Email is required"),
  password: Yup.string()
    .label("Password")
    .required("Password is required")
    .min(5, "Password too Short!"),
});

class UserRegistration extends React.Component<Props, UserRegState> {
  initialValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      backendError: {},
      successMessage: {},
    };

    this.postForm = this.postForm.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.status !== prevProps.status) {
      if (this.props.status === post.POSTING_FAILED && this.props.error) {
        this.setState({ backendError: this.props.error });
      }
      if (
        this.props.status === post.POST_SUCCESSFUL &&
        this.props.successMessage
      ) {
        this.setState({ successMessage: this.props.successMessage });
      }
    }
  }

  postForm(body: {}): void {
    this.props.post({
      url: path("postBuyer"),
      body: body,
      reqAuth: false,
    });
  }

  render() {
    return (
      <BuyerSignUpForm
        onSubmit={this.postForm}
        schema={schema}
        initialValues={this.initialValues}
        onCancel={this.props.onCancel}
        serverErrors={this.state.backendError}
        serverSuccessMessage={this.props.successMessage}
      />
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapDispatch: MapDispatch = (dispatch) => ({
  post: (payload) => dispatch(Posting(payload)),
});

const mapProps: MapProps = ({ posts }, { onCancel }) => ({
  status: posts.operations.postItem.status,
  error: posts.operations.postItem.responseError,
  successMessage: posts.sucessMessage,
  onCancel,
});

export default compose<React.ComponentClass<Pick<UserRegProps, "onCancel">>>(
  withRouter,
  connect(mapProps, mapDispatch)
)(UserRegistration);
