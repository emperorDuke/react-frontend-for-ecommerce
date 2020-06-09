import React from "react";
import Form from "../CustomForms";
import { withRouter, NextRouter } from "next/router";
import { compose, Dispatch } from "redux";
import { connect } from "react-redux";
import validationSchema from "./validationSchema";
import { regParams } from "../UserRegSection";
import { RootStoreState } from "../../redux/reducers/RootReducer/@types";
import {
  Posting,
  post,
  PostingPayloadType
} from "../../redux/actionCreators/PostActions";

export * from "./validationSchema";

interface State {
  backendError: any;
  reload: boolean;
}

type Props = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> & { router: NextRouter };

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { backendError: {}, reload: false };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.status !== prevProps.status) {
      if (this.props.status === post.POSTING_FAILED && this.props.error) {
        this.setState({ backendError: this.props.error, reload: true });
      }

      if (this.props.status === post.POST_SUCCESSFUL && !this.props.error) {
        this.props.router.push({
          pathname: "/user"
        });
      }
    }
  }

  postForm = (data: {}) => {
    this.props.post({ url: "login/", body: data, reqAuth: false });
  };

  render() {
    const loginParams = regParams.filter(
      param => param.field === "password" || param.field === "email"
    );

    if (this.state.reload) {
      Object.keys(this.state.backendError).forEach(key => {
        loginParams.forEach(param => {
          if (param.field === key)
            param.responseError = this.state.backendError[key];
        });
      });
    }

    const initialValues = {
      email: "",
      password: ""
    };

    return (
      <Form
        formParams={loginParams}
        onPost={this.postForm}
        initialValues={initialValues}
        ValidationSchema={validationSchema}
        logIn
      />
    );
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapState = ({ posts }: RootStoreState) => ({
  status: posts.operations.postItem.status,
  error: posts.operations.postItem.responseError,
  successMessage: posts.sucessMessage
});

const mapDispatch = (dispatch: Dispatch) => ({
  post: (arg: PostingPayloadType) => dispatch(Posting(arg))
});

export default compose<React.ComponentClass>(
  withRouter,
  connect(mapState, mapDispatch)
)(Login);
