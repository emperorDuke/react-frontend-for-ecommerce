import React from "react";
import Form from "../CustomForms";
import { compose, Dispatch } from "redux";
import { connect } from "react-redux";
import validationSchema from "./validationSchema";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { RootStoreState } from "../../redux/reducers/RootReducer";
import { withRouter, NextRouter } from "next/router";
import {
  Posting,
  PostingPayloadType,
  post
} from "../../redux/actionCreators/PostActions";
import { regParams } from "./params";

export * from "./params";
export * from "./validationSchema";

interface State {
  backendError: any;
  reload: boolean;
}

type Props = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps> & { router: NextRouter };

class UserRegistration extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      backendError: {},
      reload: false
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.status !== prevProps.status) {
      if (this.props.status === post.POSTING_FAILED && this.props.error) {
        this.setState({ backendError: this.props.error, reload: true });
      }

      if (this.props.status === post.POST_SUCCESSFUL && !this.props.error) {
        this.props.router.push("/store/sign-up");
      }
    }
  }

  postForm = (body: {}) => {
    this.props.post({
      url: "user/",
      body: body,
      reqAuth: false
    });
  };

  render() {
    const clonedUserRegParams = regParams.slice();

    if (this.state.reload) {
      Object.keys(this.state.backendError).forEach(key => {
        clonedUserRegParams.forEach(param => {
          if (param.field === key) {
            param.responseError = this.state.backendError[key];
          }
        });
      });
    }

    const initialvalues = {
      first_name: "",
      middle_name: "",
      last_name: "",
      address: "",
      phone_number: "",
      email: "",
      password: "",
      confirm_password: ""
    };

    return (
      <Grid container>
        <Grid item sm={6}>
          <Paper>
            <Form
              formParams={clonedUserRegParams}
              onPost={this.postForm}
              initialValues={initialvalues}
              ValidationSchema={validationSchema}
              moreForms
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const mapDispatchToProps = (dispatch: Dispatch) => ({
  post: (payload: PostingPayloadType) => dispatch(Posting(payload))
});

const mapStateToProps = ({ posts }: RootStoreState) => ({
  status: posts.operations.postItem.status,
  successMessage: posts.sucessMessage,
  error: posts.operations.postItem.responseError
});

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(UserRegistration);
