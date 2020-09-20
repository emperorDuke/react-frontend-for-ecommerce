import { ajax } from "rxjs/ajax";
import { AjaxCreationMethod } from "rxjs/internal/observable/dom/AjaxObservable";
import Thunk from "redux-thunk";
import rootReducer, { RootStoreState } from "../redux/reducers/RootReducer";
import { Preloadedstate } from "../redux/initialState";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import { createStore, applyMiddleware, Action } from "redux";
import rootEpics from "../redux/epics/RootEpics";
import axios from "axios-observable";

export type EpicDepenciesType = {
  http: typeof axios;
};

type IEpicMiddleware = EpicMiddleware<
  Action<any>,
  Action<any>,
  RootStoreState,
  EpicDepenciesType
>;

export default (initStore = {}) => {
  const epicMiddleware: IEpicMiddleware = createEpicMiddleware({
    dependencies: { http: axios },
  });

  const store = createStore(
    rootReducer,
    initStore,
    applyMiddleware(epicMiddleware, Thunk)
  );

  epicMiddleware.run(rootEpics);

  return store;
};
