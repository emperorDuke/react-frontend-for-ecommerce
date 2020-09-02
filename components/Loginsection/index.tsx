import React from "react";
import { withRouter, NextRouter } from "next/router";
import { compose, Dispatch } from "redux";
import { connect } from "react-redux";
import validationSchema from "./validationSchema";
import { RootStoreState } from "../../redux/reducers/RootReducer/@types";
import {
  Posting,
  post,
  PostingPayloadType,
} from "../../redux/actionCreators/PostActions";
import { LoginForm } from "../LoginForm";


interface State {
  backendError: any;
}

type Props = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> & { router: NextRouter };

class Login extends React.Component<Props, State> {
  initialValues = {
    email: "",
    password: "",
  };

  constructor(props: Props) {
    super(props);
    this.state = { backendError: {}};

    this.postForm = this.postForm.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.status !== prevProps.status) {
      if (this.props.status === post.POSTING_FAILED && this.props.error) {
        this.setState({ backendError: this.props.error });
      }

      if (this.props.status === post.POST_SUCCESSFUL && !this.props.error) {
        this.props.router.push({
          pathname: "/user",
        });
      }
    }
  }

  postForm(data: {}) {
    this.props.post({ url: "login/", body: data, reqAuth: false });
  }

  render() {
    return (
      <LoginForm
        initialValues={this.initialValues}
        onSubmit={this.postForm}
        serverErrors={this.state.backendError}
        schema={validationSchema}
      />
    );
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapState = ({ posts }: RootStoreState) => ({
  status: posts.operations.postItem.status,
  error: posts.operations.postItem.responseError,
  successMessage: posts.sucessMessage,
});

const mapDispatch = (dispatch: Dispatch) => ({
  post: (arg: PostingPayloadType) => dispatch(Posting(arg)),
});

export default compose<React.ComponentClass>(
  withRouter,
  connect(mapState, mapDispatch)
)(Login);
