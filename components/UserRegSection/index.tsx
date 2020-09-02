import React from "react";
import { compose, Dispatch } from "redux";
import { connect } from "react-redux";
import { RootStoreState } from "../../redux/reducers/RootReducer";
import { withRouter, NextRouter } from "next/router";
import {
  Posting,
  PostingPayloadType,
  post,
} from "../../redux/actionCreators/PostActions";
import UserRegValidationSchema from "./validationSchema";
import { BuyerSignUpForm } from "../BuyerSignUpForm";

interface State {
  backendError: any;
}

type Props = ReturnType<typeof mapDispatch> &
  ReturnType<typeof mapProps> & {
    router: NextRouter;
  };

class UserRegistration extends React.Component<Props, State> {
  initialValues = {
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
    address: "",
    country: "",
    city: "",
    state: "",
    zip_code: "",
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      backendError: {},
    };

    this.postForm = this.postForm.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.status !== prevProps.status) {
      if (this.props.status === post.POSTING_FAILED && this.props.error) {
        this.setState({ backendError: this.props.error });
      }

      if (this.props.status === post.POST_SUCCESSFUL && !this.props.error) {
        this.props.router.push("/store/sign-up");
      }
    }
  }

  postForm(body: {}): void {
    this.props.post({
      url: "user/",
      body: body,
      reqAuth: false,
    });
  }

  render() {
    return (
      <BuyerSignUpForm
        onSubmit={this.postForm}
        schema={UserRegValidationSchema}
        initialValues={this.initialValues}
        onCancel={this.props.onCancel}
        serverErrors={this.state.backendError}
      />
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapDispatch = (dispatch: Dispatch) => ({
  post: (payload: PostingPayloadType) => dispatch(Posting(payload)),
});

const mapProps = (
  { posts }: RootStoreState,
  { onCancel }: { onCancel?: () => void }
) => ({
  status: posts.operations.postItem.status,
  error: posts.operations.postItem.responseError,
  onCancel,
});

export default compose<React.ComponentClass<{ onCancel?: () => void }>>(
  withRouter,
  connect(mapProps, mapDispatch)
)(UserRegistration);
