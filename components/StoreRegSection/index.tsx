import React from "react";
import Form from "../CustomForms";
import { compose, Dispatch } from "redux";
import { connect } from "react-redux";
import validationSchema from "./validationSchema";
import { ImageField } from "../CustomForms/InputTagForImages";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { RootStoreState } from "../../redux/reducers/RootReducer";
import { withRouter, NextRouter } from "next/router";
import { imageParam, storeRegParams } from "./params";
import {
  Posting,
  PostingPayloadType,
  post
} from "../../redux/actionCreators/PostActions";

interface FormValue {
  [value: string]: string;
}

interface State {
  backendError: any;
  reload: boolean;
}

type Props = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> & { router: NextRouter };

class StoreRegistration extends React.Component<Props, State> {
  inputRef = React.createRef<HTMLInputElement>();

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
        this.props.router.push("/user/dashboard");
      }
    }
  }

  postForm = (data: FormValue, imageField?: Array<ImageField>) => {
    const formData = new FormData();

    Object.keys(data).forEach(key => formData.append(key, data[key]));

    if (
      imageField &&
      imageField[0].ref.current.files[0] &&
      imageField[0].field
    ) {
      formData.append(imageField[0].field, imageField[0].ref.current.files[0]);
    }

    this.props.post({
      url: "store/",
      body: formData,
      reqAuth: false,
      config: { "Content-Type": "multipart/form-data" }
    });
  };

  render() {
    const initialValues = Object.create(Object.prototype);
    const clonedLogoField = imageParam.slice() as Array<ImageField>;

    if (this.state.reload) {
      Object.keys(this.state.backendError).forEach(key => {
        storeRegParams.forEach(param => {
          if (param.field === key) {
            param.responseError = this.state.backendError[key];
          }
        });
      });
    }

    storeRegParams.forEach(param => {
      Object.defineProperty(initialValues, param.field, {
        value: "",
        enumerable: true
      });
    });

    clonedLogoField.forEach(field => {
      field["ref"] = this.inputRef;
    });

    const storeLogo = { imageFields: clonedLogoField };

    return (
      <Grid container>
        <Grid item sm={6}>
          <Paper>
            <Form
              initialValues={initialValues}
              ValidationSchema={validationSchema}
              onPost={this.postForm}
              formParams={storeRegParams}
              fieldParams={storeLogo}
            />
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatch = (dispatch: Dispatch) => ({
  post: (payload: PostingPayloadType) => dispatch(Posting(payload))
});

const mapState = ({ posts }: RootStoreState) => ({
  status: posts.operations.postItem.status,
  successMessage: posts.sucessMessage,
  error: posts.operations.postItem.responseError
});

export default compose(
  withRouter,
  connect(mapState, mapDispatch)
)(StoreRegistration);
