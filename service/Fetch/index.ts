import { Dispatch, Action } from "redux";
import axios from "axios";

type ActionCreatorType = (arg: any) => Action;

interface ActionType {
  success: ActionCreatorType;
  failure: ActionCreatorType;
}

function makeArray<T>(item: T): T[] {
  return Array.isArray(item) ? item : [item];
}

export default function fetch(
  dispatch: Dispatch,
  action: ActionType,
  url: string
) {
  return axios
    .get(url, { headers: { ["Content-Type"]: "application/json" } })
    .then(response => {
      if (response.status === 200) {
        return dispatch(action.success(makeArray(response.data)));
      } else {
        return dispatch(action.failure(response.data));
      }
    })
    .catch(err => dispatch(action.failure(err.response)));
}
