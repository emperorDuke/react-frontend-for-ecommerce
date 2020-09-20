import {
  PostStatus,
  PostingType,
  PostingPayloadType,
} from "../../redux/actionCreators/PostActions";
import { NextRouter } from "next/router";
import { RootStoreState } from "../../redux/reducers/RootReducer";
import { Dispatch } from "redux";

export interface UserRegProps {
  onCancel?: () => void;
  status: PostStatus;
  error: any;
  successMessage: any;
  router: NextRouter;
}

export interface UserRegState extends Pick<UserRegProps, "successMessage">{
  backendError: any;
}

export interface UserRegDispatchProps {
  post: (payload: PostingPayloadType) => PostingType;
}

export type MapProps = (
  state: RootStoreState,
  ownProps: Pick<UserRegProps, "onCancel">
) => Omit<UserRegProps, "router">;

export type MapDispatch = (dispatch: Dispatch) => UserRegDispatchProps;
