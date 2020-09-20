import {
  PostStatus,
  PostingPayloadType,
  PostingType,
} from "../../../redux/actionCreators/PostActions";
import {
  UserType,
  UserSuccessfulType,
} from "../../../redux/actionCreators/UserActions";
import { RootStoreState } from "../../../redux/reducers/RootReducer";
import { Dispatch } from "redux";
import { NextRouter } from "next/router";

interface Props {
  error: any;
  successMessage: any;
  status: PostStatus;
  router: NextRouter;
}

interface DispatchType {
  addUser: (param: UserType) => UserSuccessfulType;
  post: (param: PostingPayloadType) => PostingType;
}

export type LoginState = Pick<Props, "successMessage" | "error">;

export type MapState = (state: RootStoreState) => Omit<Props, "router">;

export type MapDispatch = (dispatch: Dispatch) => DispatchType;

export type LoginProps = Props & DispatchType;
