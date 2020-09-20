import React from "react";
import { withRouter } from "next/router";
import { compose } from "redux";
import { connect } from "react-redux";
import validationSchema from "./validationSchema";
import { Posting, post } from "../../../redux/actionCreators/PostActions";
import { LoginForm } from "../Form";
import { apiUrl } from "../../../services";
import { userSuccesful } from "../../../redux/actionCreators/UserActions";
import { MapState, MapDispatch, LoginState, LoginProps } from "./@types";

class Login extends React.Component<LoginProps, LoginState> {
  initialValues = {
    email: "",
    password: "",
  };

  constructor(props: LoginProps) {
    super(props);
    this.state = { error: {}, successMessage: {} };

    this.postForm = this.postForm.bind(this);
  }

  componentDidUpdate(prevProps: LoginProps) {
    const onFailed = this.props.status === post.POSTING_FAILED;
    const onSuccess = this.props.status === post.POST_SUCCESSFUL;

    if (this.props.status !== prevProps.status) {
      if (onFailed && this.props.error) {
        this.setState({ error: this.props.error });
      }

      if (onSuccess && this.props.successMessage) {
        this.props.addUser(this.props.successMessage["user"]);
        this.setState({ successMessage: this.props.successMessage["user"] });
      }
    }
  }

  postForm(data: {}) {
    this.props.post({ url: apiUrl("loginBuyer"), body: data, reqAuth: false });
  }

  render() {
    return (
      <LoginForm
        initialValues={this.initialValues}
        onSubmit={this.postForm}
        serverErrors={this.state.error}
        schema={validationSchema}
      />
    );
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapState: MapState = ({ posts }) => ({
  status: posts.operations.postItem.status,
  error: posts.operations.postItem.responseError,
  successMessage: posts.sucessMessage,
});

const mapDispatch: MapDispatch = (dispatch) => ({
  post: (arg) => dispatch(Posting(arg)),
  addUser: (param) => dispatch(userSuccesful(param)),
});

export default compose<React.ComponentClass>(
  withRouter,
  connect(mapState, mapDispatch)
)(Login);
